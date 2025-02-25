FROM node:18-alpine AS build

WORKDIR /workspaces
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN sh prisma-and-build.sh

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /workspaces/dist ./

CMD ["node", "index.js"]
