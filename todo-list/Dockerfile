FROM node:18-slim AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist ./
CMD ["nginx", "-g", "daemon off;"]
