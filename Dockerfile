# Usa la imagen de Node.js como base
FROM node:18 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente del proyecto
COPY . .

# Compila el proyecto Angular
RUN npm run build --prod

# Usa una imagen más liviana para servir la aplicación
FROM nginx:alpine

# Copia los archivos de build del contenedor anterior a la carpeta de Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
