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
ENV VITE_APP_API_BASE_URL=/api
ENV VITE_APP_API_PROTOCOL=https
ENV VITE_APP_API_HOST=sber.levandrovskiy.ru
ENV VITE_APP_API_SERVICE_PORT=443
ENV VITE_APP_AUTH_SBER_URL=https://id.sber.ru/CSAFront/oidc/authorize.do?oidcReferrer=https%3A%2F%2Freg.greenmarathon.sberbank.ru&channel=browser&logUid=0c830a7fbb0f483eb41eae7ac07f660e&scope=openid%20name%20mobile%20email%20birthdate%20gender&client_type=PRIVATE&nonce=0d7ea9564ef6b0fc5d595f874da2f26f&code_challenge=loGt96bWh9NuK6psdbqNJ0kAa-dPsqS-wrazQb5NSpg&code_challenge_method=S256&state=a03e9baebbdf573cbc57a59b2f276e7e&response_type=code&redirect_uri=https%3A%2F%2Freg.greenmarathon.sberbank.ru%2Fsber_id.action&client_id=2e9b40e4-235c-432f-bf1f-ad4e7069e065&app=false&personalization=false&display=page


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
