
FROM node:18.17.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=node /app/dist/sdv-chat-f /usr/share/nginx/html
