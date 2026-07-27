###############################################################################
# Makefile — Commandes de développement SICRES
# Usage: make <commande>
###############################################################################

.PHONY: help up down build rebuild logs logs-php logs-nginx logs-postgres \
        logs-frontend logs-queue logs-redis shell-php shell-postgres \
        shell-redis shell-frontend migrate migrate-fresh seed test \
        test-coverage artisan composer cache-clear cache-warm \
        backup restore pgadmin ps clean prune health setup

# Couleurs
GREEN  := \033[0;32m
YELLOW := \033[1;33m
BLUE   := \033[0;34m
RED    := \033[0;31m
NC     := \033[0m

# Fichier compose
COMPOSE := docker compose
PHP     := $(COMPOSE) exec php
ARTISAN := $(PHP) php artisan

##############################################################################
help: ## Affiche cette aide
	@echo ""
	@echo "$(BLUE)╔══════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║          SICRES — Commandes Docker                   ║$(NC)"
	@echo "$(BLUE)╚══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)  %-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

##############################################################################
# === CONTENEURS ===
##############################################################################
up: ## Démarrer tous les services
	@echo "$(GREEN)▶ Démarrage des services SICRES...$(NC)"
	$(COMPOSE) up -d
	@echo "$(GREEN)✓ Services démarrés$(NC)"
	@echo "  🌐 API Backend  : http://localhost:80/api"
	@echo "  🖥  Frontend     : http://localhost:3000"
	@echo "  📧 Mailpit UI   : http://localhost:8025"

down: ## Arrêter tous les services
	@echo "$(YELLOW)■ Arrêt des services...$(NC)"
	$(COMPOSE) down

restart: ## Redémarrer tous les services
	$(COMPOSE) restart

build: ## Construire les images Docker
	@echo "$(BLUE)🔨 Construction des images...$(NC)"
	$(COMPOSE) build

rebuild: ## Reconstruire les images sans cache
	@echo "$(BLUE)🔨 Reconstruction des images (sans cache)...$(NC)"
	$(COMPOSE) build --no-cache

ps: ## Afficher l'état des conteneurs
	$(COMPOSE) ps

##############################################################################
# === LOGS ===
##############################################################################
logs: ## Afficher les logs de tous les services
	$(COMPOSE) logs -f

logs-php: ## Logs du service PHP
	$(COMPOSE) logs -f php

logs-nginx: ## Logs du service Nginx
	$(COMPOSE) logs -f nginx

logs-postgres: ## Logs de PostgreSQL
	$(COMPOSE) logs -f postgres

logs-frontend: ## Logs du service Frontend
	$(COMPOSE) logs -f frontend

logs-queue: ## Logs du worker de file d'attente
	$(COMPOSE) logs -f queue

logs-redis: ## Logs de Redis
	$(COMPOSE) logs -f redis

##############################################################################
# === ACCÈS AUX CONTENEURS ===
##############################################################################
shell-php: ## Ouvrir un shell dans le conteneur PHP
	$(PHP) bash

shell-postgres: ## Ouvrir psql dans PostgreSQL
	$(COMPOSE) exec postgres psql -U $${DB_USERNAME:-sicres_user} -d $${DB_DATABASE:-sicres_db}

shell-redis: ## Ouvrir redis-cli
	$(COMPOSE) exec redis redis-cli -a $${REDIS_PASSWORD:-sicres_redis_secret}

shell-frontend: ## Ouvrir un shell dans le conteneur Frontend
	$(COMPOSE) exec frontend sh

##############################################################################
# === LARAVEL ===
##############################################################################
migrate: ## Exécuter les migrations
	$(ARTISAN) migrate

migrate-fresh: ## Recréer la base de données (ATTENTION: supprime les données)
	@echo "$(RED)⚠ Cette commande supprime toutes les données !$(NC)"
	@read -p "Confirmer ? (oui/non): " confirm; \
	if [ "$$confirm" = "oui" ]; then \
		$(ARTISAN) migrate:fresh --seed; \
	fi

seed: ## Exécuter les seeders
	$(ARTISAN) db:seed

artisan: ## Exécuter une commande Artisan (ex: make artisan CMD="route:list")
	$(ARTISAN) $(CMD)

composer: ## Exécuter Composer (ex: make composer CMD="require package/name")
	$(PHP) composer $(CMD)

cache-clear: ## Vider tous les caches Laravel
	$(ARTISAN) cache:clear
	$(ARTISAN) config:clear
	$(ARTISAN) route:clear
	$(ARTISAN) view:clear

cache-warm: ## Réchauffer tous les caches Laravel
	$(ARTISAN) config:cache
	$(ARTISAN) route:cache
	$(ARTISAN) view:cache

test: ## Exécuter les tests PHPUnit
	$(PHP) php artisan test

test-coverage: ## Exécuter les tests avec couverture de code
	$(PHP) php artisan test --coverage

##############################################################################
# === BASE DE DONNÉES ===
##############################################################################
backup: ## Sauvegarder la base de données
	@echo "$(BLUE)💾 Sauvegarde de la base de données...$(NC)"
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	$(COMPOSE) exec postgres pg_dump \
		-U $${DB_USERNAME:-sicres_user} \
		-d $${DB_DATABASE:-sicres_db} \
		--no-password \
		> docker/postgres/backups/backup_$$TIMESTAMP.sql; \
	echo "$(GREEN)✓ Sauvegarde: docker/postgres/backups/backup_$$TIMESTAMP.sql$(NC)"

restore: ## Restaurer une sauvegarde (ex: make restore FILE=backup_20260726.sql)
	@echo "$(YELLOW)⚠ Restauration depuis: docker/postgres/backups/$(FILE)$(NC)"
	$(COMPOSE) exec -T postgres psql \
		-U $${DB_USERNAME:-sicres_user} \
		-d $${DB_DATABASE:-sicres_db} \
		< docker/postgres/backups/$(FILE)

##############################################################################
# === OUTILS DE DÉVELOPPEMENT ===
##############################################################################
pgadmin: ## Démarrer pgAdmin (interface graphique PostgreSQL)
	$(COMPOSE) --profile tools up -d pgadmin
	@echo "$(GREEN)✓ pgAdmin disponible : http://localhost:$${PGADMIN_PORT:-5050}$(NC)"

##############################################################################
# === OUTILS & QUALITÉ ===
##############################################################################
health: ## Vérifier la santé de toute la stack
	@bash docker/scripts/healthcheck.sh

##############################################################################
# === NETTOYAGE ===
##############################################################################
clean: ## Arrêter et supprimer les conteneurs, images et volumes (ATTENTION!)
	@echo "$(RED)⚠ Cette commande supprime TOUT (conteneurs, images, volumes SICRES)$(NC)"
	@read -p "Confirmer ? (oui/non): " confirm; \
	if [ "$$confirm" = "oui" ]; then \
		$(COMPOSE) down -v --rmi local; \
		echo "$(GREEN)✓ Nettoyage terminé$(NC)"; \
	fi

prune: ## Nettoyer les ressources Docker inutilisées
	docker system prune -f

##############################################################################
# === SETUP INITIAL ===
##############################################################################
setup: ## Installation complète (première fois)
	@echo "$(BLUE)🚀 Installation initiale de SICRES...$(NC)"
	@test -f .env || (cp .env.example .env && echo "$(GREEN)  ✓ .env créé depuis .env.example$(NC)")
	@$(MAKE) build
	@$(MAKE) up
	@echo "$(YELLOW)  ⏳ Attente de la base de données...$(NC)"
	@sleep 8
	@$(MAKE) migrate
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║  ✓ SICRES est prêt !                      ║$(NC)"
	@echo "$(GREEN)║                                           ║$(NC)"
	@echo "$(GREEN)║  🌐 API    : http://localhost/api          ║$(NC)"
	@echo "$(GREEN)║  🖥  Frontend : http://localhost:3000       ║$(NC)"
	@echo "$(GREEN)║  📧 Emails : http://localhost:8025        ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
