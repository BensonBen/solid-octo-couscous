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
* [bcrypt](https://github.com/imagerelay/imagerelay-php) password hashing.
* [bcrypt](https://github.com/imagerelay/imagerelay-php) password hashing.

Errors
-------------
The actions you can access in the API are dependant upon the permission levels assigned to your Image Relay account.
For instance, not all users are permitted to upload files or create folders, or see a list of users. If you find yourself
receiving "401 Unauthorized" errors, please confirm your permission level with your Image Relay Administrator.

If you find a typo or an error in the documentation, we welcome pull requests. You can also [submit an issue](https://github.com/imagerelay/API/issues) (will require a github account) and we will look into it.

If you have questions or trouble implementing the API, you can reach out to support@imagerelay.com and we'll help you out.
Need general help with Image Relay? Checkout our [online support center](http://support.imagerelay.com).

Status Code Explanations
-------

* 401: Invalid or unauthorized API user – verify your API user is valid and authorized to access the API. Contact support if you'd like assistance.
* 403: Missing User-Agent header - all API requests require an User-Agent header, please identify yourself appropriately
* 405: Unknown HTTP method - we only support standard HTTP requests, please double-check your request verb
* 429: Too many requests (throttling) – slow down your request frequency
* 502: Under heavy load – slow down your request frequency
* 5xx: Server error - please double-check your JSON payload for formatting errors, data integrity, etc.

