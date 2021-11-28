FROM node as react-build

WORKDIR /app
COPY package.json .

RUN npm install -g npm@8.1.4
RUN npm install
COPY . .

# ENV NODE_OPTIONS=--openssl-legacy-provider
ENV REACT_APP_AUTH0_DOMAIN="epica.us.auth0.com"
ENV REACT_APP_AUTH0_CLIENT_ID="Blf3lXu11K7ugV1B6OiIMCCxz3CgOaOp"
RUN npm run build

FROM nginx
COPY --from=react-build /app/build /usr/share/nginx/html


RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]