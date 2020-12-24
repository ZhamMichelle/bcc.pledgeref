FROM node:11.14.0-alpine AS builder

WORKDIR /app
COPY package*.json /app/

ENV NO_PROXY nexus.apps.bcc.kz,$NO_PROXY

RUN npm config set registry https://nexus.apps.bcc.kz/repository/npm-group/

RUN npm config set sass-binary-site=https://nexus.apps.bcc.kz/repository/raw-github-proxy/sass/node-sass/releases/download

RUN npm install

COPY ./ /app/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.config.js && exec nginx -g 'daemon off;'"]
