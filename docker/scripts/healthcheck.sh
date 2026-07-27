#!/usr/bin/env bash
# =============================================================================
# healthcheck.sh — Vérification de santé de la stack SICRES
# Usage : ./docker/scripts/healthcheck.sh
# =============================================================================
set -euo pipefail

# --- Couleurs ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0

check() {
    local name="$1"
    local cmd="$2"
    if eval "$cmd" &>/dev/null; then
        echo -e "  ${GREEN}✓${NC} $name"
        ((PASS++))
    else
        echo -e "  ${RED}✗${NC} $name"
        ((FAIL++))
    fi
}

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     SICRES — Healthcheck Stack Docker    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# --- Conteneurs ---
echo -e "${YELLOW}▶ Conteneurs Docker${NC}"
check "postgres  (PostgreSQL 17)" "docker compose ps postgres | grep -E 'running|healthy'"
check "redis     (Redis 7)"        "docker compose ps redis    | grep -E 'running|healthy'"
check "php       (PHP 8.4-FPM)"   "docker compose ps php      | grep -E 'running|healthy'"
check "nginx     (Nginx)"          "docker compose ps nginx    | grep -E 'running|healthy'"
check "frontend  (Next.js)"        "docker compose ps frontend | grep -E 'running|healthy'"
check "queue     (Laravel Queue)"  "docker compose ps queue    | grep -E 'running|healthy'"
check "mailpit   (Mailpit)"        "docker compose ps mailpit  | grep -E 'running|healthy'"
echo ""

# --- Connectivité HTTP ---
echo -e "${YELLOW}▶ Connectivité HTTP${NC}"
check "API Backend  (http://localhost/api/health)"  "curl -sf http://localhost/api/health"
check "Frontend     (http://localhost:3000)"         "curl -sf http://localhost:3000"
check "Mailpit UI   (http://localhost:8025)"         "curl -sf http://localhost:8025"
echo ""

# --- PostgreSQL ---
echo -e "${YELLOW}▶ Base de données${NC}"
check "Connexion PostgreSQL" \
    "docker compose exec -T postgres pg_isready -U \${DB_USERNAME:-sicres_user} -d \${DB_DATABASE:-sicres_db}"
check "Extension uuid-ossp" \
    "docker compose exec -T postgres psql -U \${DB_USERNAME:-sicres_user} -d \${DB_DATABASE:-sicres_db} -c \"SELECT 1 FROM pg_extension WHERE extname='uuid-ossp'\" | grep -q 1"
echo ""

# --- Redis ---
echo -e "${YELLOW}▶ Cache / Queue${NC}"
check "Connexion Redis" \
    "docker compose exec -T redis redis-cli -a \${REDIS_PASSWORD:-sicres_redis_secret} ping | grep -q PONG"
echo ""

# --- Résumé ---
TOTAL=$((PASS + FAIL))
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
if [ "$FAIL" -eq 0 ]; then
    echo -e "${GREEN}  ✓ Tous les checks sont passés (${PASS}/${TOTAL})${NC}"
else
    echo -e "${RED}  ✗ ${FAIL} check(s) échoué(s) sur ${TOTAL}${NC}"
    echo -e "${YELLOW}  → Consultez les logs : make logs${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

exit "$FAIL"
