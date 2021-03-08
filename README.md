# solid-octo-couscous
Solid Octo Couscous is designed to be a electron, or web application that interfaces with popular exercise bikes. 
This project is also an exercise in machine learning for of various biking applications.

<p align="center">
	<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

## Motivation
There are a bunch of biking exercise bike applications that are overall unfriendly to use. Overly complicated, not user driver
and other things that could be improved upon in the industry.

## Build status
**TODO** setup build status in future update.
<!-- Build status of continus integration i.e. travis, appveyor etc. Ex. - 

[![Build Status](https://travis-ci.org/akashnimare/foco.svg?branch=master)](https://travis-ci.org/akashnimare/foco)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/akashnimare/foco?branch=master&svg=true)](https://ci.appveyor.com/project/akashnimare/foco/branch/master) -->

## Code style
Currently using [NX Linting](https://nx.dev) that was auto generated through their command line `npx create-nx-workspace`
which is based on [eslint](https://eslint.org).
 
## Screenshots
**TODO** setup screenshots of the landing page in the future. 

## Frameworks used
<b>Built with</b>
- [Angular](https://angular.io/) Web Framework
- [Angular Material](https://material.angular.io) Web Style Patterns
- [ESLint](https://eslint.org) Style Adherence
- [Express](https://expressjs.com) API Server
- [GraphQL](https://graphql.org) Database
- [Jest](https://jestjs.io) Frontend Testing
- [Node JS](https://nodejs.org/en/) Backend
- [Nx](https://nx.dev) Complexity Management
- [NGINX](https://www.nginx.com/) Web Server
- [NgRx](https://ngrx.io/) Frontend State Management
- [TensorFlowJS](https://www.tensorflow.org/js) Machine learning in the browser
- [Raspberry PI 4](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) Physical Test Server

## Features
- Data Logging for your exercise habits
- Heart rate monitoring
- Custom Exercise habits

## Code Example
**TODO**

## Contribution Guidelines (Provided by Nx)

1. Fork the repo and create your branch from `develop`.
2. If you've added code that should be tested, add tests.
   1. run `ng test my-app` to execute unit tests using [jest](https://jestjs.io)
   2. run `nx affected:test` to execute end-to-end tests affected by the change.
3. Update API information as needed.
4. Make sure your code lints.
   1. run `nx lint <project> [options]` [documentation](https://nx.dev/latest/angular/cli/lint)
5. Pull Request
   1. Open a Pull request against the original branch `develop`
   2. Your pull request will build and additional code quality checks will be made.
   3. Be open to criticism after all we're human all human... right? 🤖

## Installation
**TODO** need to figure out physical implemention of web server and have a page of setup.

## API Reference
|     Enpoint      |  Type  |                                              Body                                               | Screenshot With Postman |
| :--------------: | :----: | :---------------------------------------------------------------------------------------------: | :---------------------: |
| `/v1/products/1` |  GET   |                                              None                                               |                         |
| `/v1/products/1` | DELETE |                                              None                                               |                         |
|  `/v1/products`  |  POST  | `{ "color": "blue", "cost": 2, "name": "SirGrabingtonTheThird", "retired": 1, "size": "small"}` |                         |
|  `/v1/products`  | PATCH  |     `{ "id": 3, "color": "red", "cost": 2, "name": "Yeet", "retired": 1, "size": "Large" }`     |                         |

## Tests
Install `nodejs, npm, and globally install the npm package nx` from the base of the application run `nx test`. You may have to restart your command line if you just installed `nx` globally using `npm`

## How to use?
You'll be able to use the application locally through running it in development mode, or you can have an example of the application availible here `TODO`

## Credits
[Benjamin Benson](https://github.com/BensonBen)
[Rick Astley](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

[MIT License](https://opensource.org/licenses/MIT) © [Benjamin Benson](https://github.com/BensonBen)

```
MIT License

Copyright (c) 2021 Benjamin Benson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
