# Etapa 1: build del frontend (React + Vite)
FROM node:22-alpine AS build

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

RUN npm install

# Copiar el resto del código
COPY . .

# Generar build de producción
RUN npm run build

# Etapa 2: servidor web Nginx para servir el build
FROM nginx:alpine

# Copiar archivos generados al servidor web
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto por donde se servirá la app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]