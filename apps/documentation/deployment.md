# Notes on deploying all things Solid Octo Couscous 🦖 🧦

## Set Environment variables in a file `.env`

- _note_ these variables will need to be discoverable by the node process once it's loaded up by `PM2`.

| Name                       | Value                        |
| -------------------------- | ---------------------------- |
| AUTH_API_APP_NAME          | REX-API                      |
| AUTH_API_PORT              | 3333                         |
| AUTH_API_HOST_NAME         | localhost                    |
| AUTH_API_WHITE_LIST_DOMAIN | http://localhost:4200        |
| AUTH_API_ENV               | local                        |
| AUTH_API_JWT_KEY           | <.JYqDv2L"mSZ~]gb9J.$t?'S6`a |
| AUTH_API_JWT_AUDIENCE      | http://localhost:4200        |
| AUTH_API_JWT_ISSUER        | http://localhost:3333        |
| AUTH_API_JWT_ALG           | HS256                        |
| AUTH_API_REDIS_PORT        | 6379                         |
| AUTH_API_REDIS_HOST        | 0.0.0.0                      |
| AUTH_API_SALT_ROUNDS       | 10                           |
| AUTH_API_CRT               | /path/to/cert/bundle         |
| AUTH_API_SALT_ROUNDS       | /path/to/original/key        |

---

## Build REX API using NX tooling

- ```bash
  ng build rex-api --prod
  ```
- Alternatively use NX plugin for vs code and build REX API that way.

---

## Running REX API as a standalone application

- ensure `.env` file remains in the same directory as the generated script from NX tooling.
- ensure `nvm` is globally installed via your flavor of package manager.
- ensure `pm2` is globally installed via your flavor of package manager.
- ensure you're using at least node `12.x` and preferrably `14.x`.
- ensure `ecosystem.config.js` is present and configured correctly to use `dot-env` node package for environment variable loading.
- ensure redis database is discoverable on the machine you're about to deploy on through docker, or by means of a VPN.
- use
  ```bash
  sudo pm2 start ecosystem.config.js
  ```
  to get started running rex-api on your server.
- ensure the application is running by inspecting the logs for pm2.
  ```bash
  pm2 log --lines 5000 | less
  ```
- ensure the application is running by inspecting the monitoring functionaly provided by pm2.
  ```bash
  pm2 monit
  ```
- _note_ there may be a need to install `npm` dependencies for the application. Suggest to generate a `package.json` for the build once and install these packages on the server for express.
- _note_ there may also be a need to manually install packages with your flavor of package manager

---

## Configuring NGINX

- Using the reverse proxy functionaltiy of [NGINX](https://nginx.org/) segment off a portion of the URL spectrum. Such as, `https://rex.fitness/rex-api/**/*` where any traffic on this portion of the URL will be reverse proxied to the locally installed `PM2` managed application.
- ```
    # NGINX server block may look something like.
    location /rex-api {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        rewrite ^/rex-api/?(.*) /$1 break;
        proxy_redirect off;
    }
  ```
