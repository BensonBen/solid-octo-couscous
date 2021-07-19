# Notes on deploying all things Solid Octo Couscous 🦖 🧦
- First and foremost there are a number of environment variables that REX-API uses when loaded up that will need to be set.
- *note* these variables will need to be discoverable by the node process once it's loaded up by `PM2`.
  
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

