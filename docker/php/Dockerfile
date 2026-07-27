###############################################################################
# Dockerfile — PHP-FPM pour SICRES (Multi-stage Build)
# Laravel 13 + PHP 8.4 FPM
# Maintainer: BEH DEGRY JEREMIE HARDING
###############################################################################

###############################################################################
# STAGE 1 : base — Image commune à dev et prod
###############################################################################
FROM php:8.4-fpm AS base

LABEL maintainer="BEH DEGRY JEREMIE HARDING"
LABEL project="SICRES"
LABEL description="Backend Laravel 13 — Système de Recensement des Établissements Scolaires"

# Répertoire de travail
WORKDIR /var/www/html

# Timezone Cameroun
ENV TZ=Africa/Douala
ENV LANG=fr_FR.UTF-8
ENV LANGUAGE=fr_FR:fr

# Installation des dépendances système
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
    libssl-dev \
    tzdata \
    && cp /usr/share/zoneinfo/Africa/Douala /etc/localtime \
    && echo "Africa/Douala" > /etc/timezone \
    && rm -rf /var/lib/apt/lists/*

# Configuration GD avec support JPEG, FreeType et WebP
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp

# Installation des extensions PHP
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    bcmath \
    intl \
    zip \
    exif \
    pcntl \
    gd \
    xml \
    sockets \
    opcache

# Installation Redis via PECL
RUN pecl install redis \
    && docker-php-ext-enable redis

# Copie Composer depuis son image officielle (version pinée pour reproductibilité)
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# Variables d'environnement Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/composer
ENV PATH="${PATH}:/composer/vendor/bin"

# Création des dossiers nécessaires
RUN mkdir -p storage/logs \
             storage/app/public \
             storage/framework/cache \
             storage/framework/sessions \
             storage/framework/views \
             bootstrap/cache \
    && chown -R www-data:www-data /var/www/html

# PHP-FPM écoute sur le port 9000
EXPOSE 9000

###############################################################################
# STAGE 2 : development — Environnement de développement
###############################################################################
FROM base AS development

# Installation d'outils de développement supplémentaires
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configuration Xdebug pour le développement
RUN echo "[xdebug]" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.mode=develop,coverage,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log=/var/www/html/storage/logs/xdebug.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=VSCODE" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Copie et configuration du script d'entrée
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

###############################################################################
# STAGE 3 : production — Image optimisée pour la production
###############################################################################
FROM base AS production

# OPcache optimisé pour la production
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=16" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.save_comments=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.fast_shutdown=1" >> /usr/local/etc/php/conf.d/opcache.ini

# Copie du code source backend uniquement
COPY --chown=www-data:www-data backend/ /var/www/html

# Installation des dépendances Composer (sans devDependencies)
RUN composer install \
    --no-interaction \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --classmap-authoritative

# Optimisations Laravel pour la production
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

# Permissions finales
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copie et configuration du script d'entrée
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER www-data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]