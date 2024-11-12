FROM node:16-alpine AS build-stage

ENV PORT=3000

WORKDIR /aroma-delivery-ui
COPY . /aroma-delivery-ui

RUN npm install

RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "start"]

FROM nginx:1.22.1-alpine as prod-stage
COPY --from=build-stage /aroma-delivery-ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
