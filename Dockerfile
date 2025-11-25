FROM nginx:1.29.3-alpine

LABEL description="Hello World"

RUN rm -rf /usr/share/nginx/html/*
COPY html/ /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
