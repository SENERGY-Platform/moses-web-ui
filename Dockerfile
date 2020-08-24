## STAGE 1: Build Angular application ##
FROM node:10-alpine as builder
WORKDIR /workspace

# install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm ci --unsafe-perm

# copy sourcecode and build
COPY . /workspace
RUN npm run config -- --environment=prod
RUN $(npm bin)/ng build --prod

## STAGE 2: Run nginx to serve application ##
FROM nginx

COPY --from=builder /workspace/dist/moses-web-ui/ /usr/share/nginx/html/
COPY --from=builder /workspace/dist/moses-web-ui/assets/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
