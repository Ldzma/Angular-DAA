# Etapa 1: Construcción de Angular
FROM node:18 AS builder
WORKDIR /app

# Copiar package.json y package-lock.json para aprovechar la caché
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Asegurar que Angular CLI esté disponible
RUN npm install -g @angular/cli

# Ahora copiamos el resto del código
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/angular-base /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

