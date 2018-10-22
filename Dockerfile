## STAGE 1: Build Angular application ##
FROM node:alpine as builder

COPY . /workspace

WORKDIR /workspace

RUN npm install
RUN npm rebuild node-sass
RUN $(npm bin)/ng build --prod

## STAGE 2: Run nginx to serve application ##
FROM nginx

COPY --from=builder /workspace/dist/moses-web-ui/ /usr/share/nginx/html/

COPY --from=builder /nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 