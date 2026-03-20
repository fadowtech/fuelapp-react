# Stage 1: Build React app
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy all source code
COPY . .

# Build project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
