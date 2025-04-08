FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
# Eliminar archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*
# Copiar archivos de la aplicación Angular
COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html
# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]