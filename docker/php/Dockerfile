###############################################################################
# Image de base
###############################################################################

# Utilise l'image officielle PHP 8.4 avec PHP-FPM.
# PHP-FPM est recommandé avec Nginx pour les applications Laravel.
FROM php:8.4-fpm

###############################################################################
# Informations sur l'image
###############################################################################

# Métadonnées de l'image
LABEL maintainer="BEH DEGRY JEREMIE HARDING"
LABEL project="SICRES"
LABEL description="Backend Laravel 13 pour le Système de Recensement des Établissements Scolaires"

###############################################################################
# Répertoire de travail
###############################################################################

# Toutes les commandes suivantes seront exécutées dans ce dossier.
# C'est ici que le code Laravel sera monté.
WORKDIR /var/www/html

###############################################################################
# Installation des dépendances système
###############################################################################

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    nano \
    vim \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxpm-dev \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/*

###############################################################################
# Configuration de GD
###############################################################################

# Active le support JPEG et FreeType
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

###############################################################################
# Installation des extensions PHP
###############################################################################

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    bcmath \
    intl \
    zip \
    exif \
    pcntl \
    gd \
    xml

###############################################################################
# Installation de Composer
###############################################################################

# Copie Composer depuis son image officielle
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

###############################################################################
# Variables d'environnement
###############################################################################

ENV COMPOSER_ALLOW_SUPERUSER=1

###############################################################################
# Copie du projet
###############################################################################

# Le code Laravel sera monté via Docker Compose.
# Cette instruction est volontairement commentée.
# COPY ../../backend .

###############################################################################
# Permissions
###############################################################################

# Création des dossiers nécessaires
RUN mkdir -p storage bootstrap/cache

# Donne les droits à www-data
RUN chown -R www-data:www-data /var/www/html

###############################################################################
# Port
###############################################################################

# PHP-FPM écoute sur le port 9000
EXPOSE 9000

###############################################################################
# Commande de démarrage
###############################################################################

CMD ["php-fpm"]