FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production

COPY .docker/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .docker/app/nginx/conf.d/ /etc/nginx/conf.d/
COPY .docker/app/nginx/init-scripts/ /docker-entrypoint.d/
COPY .docker/app/entrypoint.sh /entrypoint.sh

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/ .
CMD ["nginx", "-g", "daemon off;"]
