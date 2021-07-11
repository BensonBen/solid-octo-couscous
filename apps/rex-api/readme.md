REX API 🦖 a S.O.C. 🧦 product
=============

The REX API is a medium for users of REX to store account, workout, friends and equipment information through the use of a JSON RESTful web interface. Currently authentication is required to access most resources and uses [JSON Web Tokens (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) in order to handle authentication.


Making a Request
-------------

All requests start with https://rex.fitness/api/v1/resource

A curl request might look something like:

```shell
curl
  -H 'Authorization: Bearer your.acquired.token.here' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: Chrome' \
  https://rex.fitness/api/v1/workout
```

Authentication
-------------
You'll need to acquire a JWT Token from the login endpoint and then include them in the Authorization header.

```shell
curl
  -H 'Content-Type: application/json' \
  -H 'User-Agent: Chrome' \
  -d '{ "loginName": "chaoz133", "password": "McYeet420" }' \
  https://rex.fitness/api/v1/login
```

Throttling (TODO)
-------------

You can perform up to 5 request/second from the same IP address. If you exceed this limit, you'll get a 429 Too Many Requests response for subsequent requests. API usage is limited. Hippity Hoppity get off my property.

APIs
-------------

Built With
-------------
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) password hashing.
* [body parser](https://github.com/expressjs/body-parser) JSON formatted parsing of requests.
* [chalk](https://github.com/chalk/chalk) make logging pretty again.
* [cors](https://github.com/expressjs/cors) express middlewear for handling CORS issues.
* [express](http://expressjs.com/) RESTful thinking.
* [express-jwt](https://github.com/auth0/express-jwt) express middlewear for handling JWTs.
* [helmet](https://helmetjs.github.io/) express middlewear to aid in setting common HTTP headers.
* [http-status](https://github.com/adaltas/node-http-status) set common HTTP statuses.
* [ioredis](https://github.com/luin/ioredis) database interface.
* [joi](https://github.com/sideway/joi) JSON validation.
* [lodash](https://lodash.com/) javascript utility library (seriously the only thing is doesn't do it cook you breakfast 🍳).
* [morgan](https://github.com/expressjs/morgan) HTTP response logging.
* [reflect-metadata](https://rbuckton.github.io/reflect-metadata/) implementation of RFC proposal for token injection.
* [tsyringe](https://github.com/Microsoft/tsyringe) allows for dependency injection architecture.

Errors
-------------

If you find a typo or an error, I'm welcome pull requests. You can also [submit an issue](https://github.com/BensonBen/solid-octo-couscous/issues) (will require a github account) and I'll will look into it.

Status Code Explanations
-------------

* 401: Invalid or unauthorized API user – verify your API user is valid and authorized to access the API.
* 403: Missing User-Agent header - all API requests require an User-Agent header, please identify yourself appropriately.
* 405: Unknown HTTP method - we only support standard HTTP requests, please double-check your request verb.
* 429: Too many requests (throttling) – slow down your request frequency.
* 502: Under heavy load – slow down your request frequency.
* 5xx: Server error - please double-check your JSON payload for formatting errors, data integrity, etc.

