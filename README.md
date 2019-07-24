# EDCS Front-End
[EDCS Backend](https://github.com/Jss7268/KGCOESeniorProjectAPI)

## Prerequisites
This README is assuming this is running on Ubuntu.
You need to install nginx, node/npm and the Angular CLI
```
sudo apt-get update
sudo apt-get install nginx npm postgresql postgresql-contrib
npm install -g @angular/cli
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Before running
You need to copy the `app.settings.ts.example` file:
```
cp src/app/app.settings.ts.example src/app/app.settings.ts
```
__Don't edit the `app.settings.ts.example` file, instead, make changes to the `app.settings.ts` file__

If running in a deployed environment, change the `API_ENDPOINT` to point to the location that you are running the [backend](https://github.com/Jss7268/KGCOESeniorProjectAPI)

## NGINX configuration (optional)

If you want to deploy your app, you can use NGINX. The default setup for NGINX will work fine, except you need to have the lines
```
location / {
                try_files $uri $uri/ /index.html;
        }
```
under your server configuration.

---
If you want to run the backend using ssl, follow [these instructions](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) to generate certificates.
Your NGINX configuration (`/etc/nginx/sites-available/default`) should look similar to this (with additional comments), with `kgcoe-sr-project.se.rit.edu` replaced with your domain.
```
server {
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name kgcoe-sr-project.se.rit.edu;
        location / {
                try_files $uri $uri/ /index.html;
        }
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/kgcoe-sr-project.se.rit.edu/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/kgcoe-sr-project.se.rit.edu/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
    if ($host = kgcoe-sr-project.se.rit.edu) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name kgcoe-sr-project.se.rit.edu;
    return 404; # managed by Certbot
}
```
Whenever this conf file is updated, run:
```
sudo systemctl restart nginx
```
If running with ssl, you need to use https in your `app.settings.ts`. (Not necessary to run locally)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build and Deploy (Optional)

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Now the build artifacts need to be moved to your nginx root.
```
sudo cp -R dist/edcs/* /var/www/html/
sudo systemctl restart nginx
```
Or to wherever you have set your root in your nginx conf file.
To check if it is running properly, navigate to https://www.your-site.com, replacing `www.your-site.com` with your site address

# Continued Development

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
