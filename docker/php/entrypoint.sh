#!/bin/bash
###############################################################################
# entrypoint.sh — Script de démarrage du conteneur PHP/Laravel
# SICRES — Système de Recensement des Établissements Scolaires
###############################################################################

set -e

###############################################################################
# Couleurs pour les logs
###############################################################################
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info()    { echo -e "${BLUE}[SICRES]${NC} $1"; }
log_success() { echo -e "${GREEN}[SICRES ✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[SICRES ⚠]${NC} $1"; }
log_error()   { echo -e "${RED}[SICRES ✗]${NC} $1"; }

###############################################################################
# 1. Vérification du fichier .env
###############################################################################
log_info "Vérification du fichier .env..."
if [ ! -f /var/www/html/.env ]; then
    if [ -f /var/www/html/.env.example ]; then
        cp /var/www/html/.env.example /var/www/html/.env
        log_warning ".env non trouvé — copie depuis .env.example"
    else
        log_error "Aucun fichier .env ou .env.example trouvé !"
        exit 1
    fi
fi
log_success ".env présent"

###############################################################################
# 2. Attente de PostgreSQL
###############################################################################
log_info "Attente de PostgreSQL (${DB_HOST:-postgres}:${DB_PORT:-5432})..."
MAX_RETRIES=30
RETRY_COUNT=0

until php -r "
    \$conn = @pg_connect('host=${DB_HOST:-postgres} port=${DB_PORT:-5432} dbname=${DB_DATABASE:-sicres_db} user=${DB_USERNAME:-sicres_user} password=${DB_PASSWORD}');
    if (\$conn === false) { exit(1); }
    pg_close(\$conn);
    echo 'OK';
" 2>/dev/null; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        log_error "PostgreSQL inaccessible après ${MAX_RETRIES} tentatives. Abandon."
        exit 1
    fi
    log_warning "PostgreSQL non prêt... tentative ${RETRY_COUNT}/${MAX_RETRIES}"
    sleep 2
done
log_success "PostgreSQL connecté"

###############################################################################
# 3. Installation des dépendances Composer (si vendor absent)
###############################################################################
log_info "Vérification des dépendances Composer..."
if [ ! -d /var/www/html/vendor ]; then
    log_warning "Dossier vendor absent — Installation des dépendances..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
    log_success "Dépendances installées"
else
    log_success "Vendor présent"
fi

###############################################################################
# 4. Génération de la clé APP_KEY (si absente)
###############################################################################
APP_KEY_VALUE=$(grep "^APP_KEY=" /var/www/html/.env | cut -d'=' -f2)
if [ -z "$APP_KEY_VALUE" ] || [ "$APP_KEY_VALUE" = "base64:" ]; then
    log_info "Génération de APP_KEY..."
    php artisan key:generate --force
    log_success "APP_KEY générée"
fi

###############################################################################
# 5. Migrations de base de données
###############################################################################
log_info "Exécution des migrations..."
php artisan migrate --force --no-interaction 2>&1 | while IFS= read -r line; do
    log_info "  $line"
done
log_success "Migrations terminées"

###############################################################################
# 6. Optimisations Laravel (cache)
###############################################################################
log_info "Optimisation Laravel (cache des configs, routes, vues)..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
log_success "Cache généré"

###############################################################################
# 7. Création du lien symbolique storage
###############################################################################
log_info "Vérification du lien storage..."
if [ ! -L /var/www/html/public/storage ]; then
    php artisan storage:link
    log_success "Lien storage créé"
else
    log_success "Lien storage déjà présent"
fi

###############################################################################
# 8. Permissions des dossiers
###############################################################################
log_info "Configuration des permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
log_success "Permissions configurées"

###############################################################################
# 9. Démarrage de PHP-FPM
###############################################################################
log_success "========================================"
log_success "  SICRES Backend prêt ! 🚀"
log_success "  Environnement : ${APP_ENV:-local}"
log_success "  PHP-FPM démarre sur le port 9000"
log_success "========================================"

exec php-fpm
