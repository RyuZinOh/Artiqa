1. install nginx server
2. go to the nginx.conf wherever it's located and at this in http block:
    ```bash
     location /{
                root /location where your file are/;
                index index.html;
                autoindex on;
                add_header Access-Control-Allow-Origin *;
                add_header Access-Control-Allow-Methods 'GET, P>
                add_header Access-Control-Allow-Headers '*';
        }
        location /upload{
                client_max_body_size 10M;
                root /location where your file are/;
        }
    ```
3. run the nginx server running location and add .env in frotend for now in dummy causes but we will use backend later for optimal usage like uplaoding stuff
4. Now use the path to get the dummy data relatively




## docker setup
1. docker build -t artiqa-nginx .
2. docker run -d -p 8080:80 --name artiqa-nginx-container artiqa-nginx
3. now use the location port 8080 on .env of frontend for your dummy tests  to server file via nginx!


