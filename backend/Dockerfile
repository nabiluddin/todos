FROM node:18-slim AS build

RUN mkdir -p /workspaces
WORKDIR /workspaces
COPY . .
RUN npm run build:prod

FROM gcr.io/distroless/nodejs22-debian12 AS production
WORKDIR /app
COPY --from=build /workspaces/dist ./

CMD ["node", "index.js"]
