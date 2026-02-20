# Stage 1: Build the React app
#FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ .yarn/

# Enable corepack (provides Yarn)
RUN corepack enable

# Install deps (use cache when supported)
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --immutable || yarn install

# Copy the rest & build
COPY . .
RUN yarn build


# Stage 2: Serve with Nginx (K8s-free image)
FROM nginx:stable-alpine

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy static build
COPY --from=build /app/build /usr/share/nginx/html

# Use nginx template (rendered at container start)
# nginx official image will envsubst files in /etc/nginx/templates/*.template
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Default upstream for safety (override in Docker/K8s)
ENV API_UPSTREAM=http://127.0.0.1:3000

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
