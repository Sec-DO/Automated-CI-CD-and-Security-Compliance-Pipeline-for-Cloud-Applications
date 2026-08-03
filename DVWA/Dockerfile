FROM php:8-apache

LABEL org.opencontainers.image.source="https://github.com/digininja/DVWA"
LABEL org.opencontainers.image.description="DVWA pre-built image"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /var/www/html

# Install required packages and PHP extensions
RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y \
        zlib1g-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        iputils-ping \
        git \
        zip \
        unzip \
        p7zip-full && \
    docker-php-ext-configure gd --with-jpeg --with-freetype && \
    docker-php-ext-install gd mysqli pdo pdo_mysql && \
    a2enmod rewrite && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copy application source
COPY --chown=www-data:www-data . /var/www/html

# Create runtime configuration
RUN cp config/config.inc.php.dist config/config.inc.php

# Install API dependencies
RUN cd /var/www/html/vulnerabilities/api && \
    composer install --no-dev --prefer-dist --no-interaction

# Fix permissions
RUN chown -R www-data:www-data /var/www/html && \
    find /var/www/html -type d -exec chmod 755 {} \; && \
    find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 80

CMD ["apache2-foreground"]
