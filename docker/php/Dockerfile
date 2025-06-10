FROM php:8.2-fpm

RUN apt-get update && apt-get install -y git
RUN apt-get update && apt-get install -y \
    curl \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer require barryvdh/laravel-debugbar --dev

RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libmcrypt-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
