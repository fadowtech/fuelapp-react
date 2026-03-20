# Stage 1: Build React app
FROM node:20 AS builder

WORKDIR /app

# Copy source code (not node_modules)
COPY project/ ./

# Clean install
RUN rm -rf node_modules bun.lockb && npm install

# Build using npx to ensure vite runs
RUN npx vite build

# Stage 2: Serve with Apache
FROM httpd:2.4

RUN rm -rf /usr/local/apache2/htdocs/*

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
COPY project/httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]

