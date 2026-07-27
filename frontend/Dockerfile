###############################################################################
# Dockerfile — Frontend Next.js pour SICRES
# Multi-stage : development | production
###############################################################################

###############################################################################
# STAGE 1 : deps — Installation des dépendances
###############################################################################
FROM node:22-alpine AS deps

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json* ./

# Installation des dépendances avec cache npm
RUN npm ci --prefer-offline

###############################################################################
# STAGE 2 : development — Hot-reload pour le développement
###############################################################################
FROM node:22-alpine AS development

LABEL maintainer="BEH DEGRY JEREMIE HARDING"
LABEL project="SICRES"
LABEL description="Frontend Next.js SICRES — Mode développement"

WORKDIR /app

# Copie des dépendances depuis le stage deps
COPY --from=deps /app/node_modules ./node_modules

# Le code source est monté via volume dans compose.yaml
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

###############################################################################
# STAGE 3 : builder — Build de production Next.js
###############################################################################
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

###############################################################################
# STAGE 4 : production — Image minimale pour la production
###############################################################################
FROM node:22-alpine AS production

LABEL maintainer="BEH DEGRY JEREMIE HARDING"
LABEL project="SICRES"
LABEL description="Frontend Next.js SICRES — Mode production"

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copie uniquement les fichiers nécessaires à la production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
