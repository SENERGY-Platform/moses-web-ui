## STAGE 1: Build Angular application ##
FROM node:10-alpine as builder

COPY . /workspace

WORKDIR /workspace

# use git
RUN apk add --no-cache git

RUN npm ci
RUN npm run config -- --environment=prod
RUN $(npm bin)/ng build --prod

## STAGE 2: Run nginx to serve application ##
FROM nginx

COPY --from=builder /workspace/dist/moses-web-ui/ /usr/share/nginx/html/
COPY --from=builder /workspace/dist/moses-web-ui/assets/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
