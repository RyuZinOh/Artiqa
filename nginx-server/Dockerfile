
FROM nginx:stable-alpine

COPY ./nginx-dev/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
