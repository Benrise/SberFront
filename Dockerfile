# Используем официальный Node.js образ в качестве базового
FROM node:21.6.1

# Устанавливаем основной пакетный менеджер
RUN npm install -g npm@10.8.0 -g pnpm && pnpm install

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем остальной исходный код в контейнер
COPY . .

# Открываем порт, который используется приложением
EXPOSE 8080

# Команда для запуска приложения
CMD ["pnpm", "run", "dev", "--", "--host"]
