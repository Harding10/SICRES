#!/usr/bin/env bash
# =============================================================================
# backup.sh — Sauvegarde automatique PostgreSQL pour SICRES
# Usage : ./docker/scripts/backup.sh [--keep N]
#         N = nombre de sauvegardes à conserver (défaut : 7)
# =============================================================================
set -euo pipefail

# --- Configuration ---
BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../docker/postgres/backups" && pwd)"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="backup_${TIMESTAMP}.sql"
KEEP=${1:-7}  # Nombre de fichiers à conserver

# Charger les variables d'environnement du .env racine
ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/.env"
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs -d '\n' 2>/dev/null || true)
fi

DB_USERNAME="${DB_USERNAME:-sicres_user}"
DB_DATABASE="${DB_DATABASE:-sicres_db}"

# --- Couleurs ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}   SICRES — Sauvegarde PostgreSQL${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"

# Créer le répertoire de sauvegardes si absent
mkdir -p "$BACKUP_DIR"

# Vérifier que le conteneur postgres est en cours d'exécution
if ! docker compose ps postgres 2>/dev/null | grep -q "running\|healthy"; then
    echo -e "${RED}✗ Le conteneur PostgreSQL n'est pas démarré.${NC}"
    echo -e "${YELLOW}  → Lancez d'abord : make up${NC}"
    exit 1
fi

# Effectuer la sauvegarde
echo -e "  📦 Sauvegarde en cours : ${FILENAME}"
docker compose exec -T postgres pg_dump \
    -U "$DB_USERNAME" \
    -d "$DB_DATABASE" \
    --no-password \
    --format=plain \
    --verbose \
    > "${BACKUP_DIR}/${FILENAME}" 2>/dev/null

if [ $? -eq 0 ] && [ -s "${BACKUP_DIR}/${FILENAME}" ]; then
    SIZE=$(du -sh "${BACKUP_DIR}/${FILENAME}" | cut -f1)
    echo -e "${GREEN}  ✓ Sauvegarde réussie : ${BACKUP_DIR}/${FILENAME} (${SIZE})${NC}"
else
    echo -e "${RED}  ✗ Échec de la sauvegarde !${NC}"
    rm -f "${BACKUP_DIR}/${FILENAME}"
    exit 1
fi

# --- Rotation des anciennes sauvegardes ---
echo -e "  🗑  Conservation des ${KEEP} dernières sauvegardes..."
BACKUP_COUNT=$(ls -1 "${BACKUP_DIR}"/backup_*.sql 2>/dev/null | wc -l)

if [ "$BACKUP_COUNT" -gt "$KEEP" ]; then
    TO_DELETE=$(ls -1t "${BACKUP_DIR}"/backup_*.sql | tail -n +$((KEEP + 1)))
    echo "$TO_DELETE" | xargs rm -f
    DELETED=$(echo "$TO_DELETE" | wc -l)
    echo -e "${YELLOW}  → ${DELETED} ancienne(s) sauvegarde(s) supprimée(s)${NC}"
fi

echo ""
echo -e "${GREEN}  ✓ Terminé. Sauvegardes disponibles :${NC}"
ls -lh "${BACKUP_DIR}"/backup_*.sql 2>/dev/null | awk '{print "    " $NF " (" $5 ")"}'
echo ""
