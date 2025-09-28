# 1) Build del frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos manifiestos primero para cache
COPY package*.json ./
# Si no tienes package-lock.json, npm ci fallará; el "||" hace fallback a npm install
RUN npm ci || npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# 2) Nginx para servir el build y hacer de reverse proxy a /api
FROM nginx:alpine
# Configuración de Nginx
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
# Artefactos del build de React
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
