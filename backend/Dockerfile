FROM node:18-alpine AS build

RUN mkdir -p /workspaces
WORKDIR /workspaces
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

RUN sh prisma-and-build.sh

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /workspaces/dist ./

CMD ["node", "index.js"]
