## STAGE 1: Build Angular application ##
FROM node:10-alpine as builder
WORKDIR /workspace

# install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm ci --unsafe-perm

# copy sourcecode and build
COPY . /workspace
RUN sed 's/production: false/production: true/' src/environments/environment.ts > src/environments/environment.prod.ts
RUN $(npm bin)/ng build --prod

## STAGE 2: Run nginx to serve application ##
FROM nginx

COPY --from=builder /workspace/dist/moses-web-ui/ /usr/share/nginx/html/
COPY --from=builder /workspace/dist/moses-web-ui/assets/nginx-custom.conf /etc/nginx/conf.d/default.conf

ADD build-env.sh /

CMD ["/bin/sh",  "-c",  "/build-env.sh /usr/share/nginx/html/ /usr/share/nginx/html/ && exec nginx -g 'daemon off;'"]

EXPOSE 80
