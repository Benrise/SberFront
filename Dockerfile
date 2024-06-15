# Этап 1: Сборка
FROM node:21-alpine AS build

# Устанавливаем основной пакетный менеджер
RUN npm install -g pnpm

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и pnpm-lock.yaml (если есть)
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем остальной исходный код в контейнер
COPY . .

# Аргументы для переменных окружения
ARG VITE_APP_API_BASE_URL
ARG VITE_APP_API_PROTOCOL
ARG VITE_APP_API_HOST
ARG VITE_APP_API_SERVICE_PORT
ARG VITE_APP_AUTH_SBER_URL

# Устанавливаем переменные окружения
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL
ENV VITE_APP_API_PROTOCOL=$VITE_APP_API_PROTOCOL
ENV VITE_APP_API_HOST=$VITE_APP_API_HOST
ENV VITE_APP_API_SERVICE_PORT=$VITE_APP_API_SERVICE_PORT
ENV VITE_APP_AUTH_SBER_URL=$VITE_APP_AUTH_SBER_URL

# Сборка приложения
RUN pnpm run build

# Этап 2: Запуск
FROM node:21-alpine

# Устанавливаем основной пакетный менеджер
RUN npm install -g pnpm

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранные файлы из этапа сборки
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./

# Устанавливаем только production-зависимости
RUN pnpm install --prod

# Открываем порт, который используется приложением
EXPOSE 8080

# Команда для запуска приложения
# CMD ["pnpm", "start"]
