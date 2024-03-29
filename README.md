# REX 🦖 a S.O.C. 🧦 product

<p align="center">
	<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

## Description

REX is designed to be a electron, or web application that interfaces with popular exercise bikes.
The user will connect their exercise bike through bluetooth, or possibly USB.

## Current State

#### Capabilities of REX include

- [x] Reading Delta Crank Event Time
- [x] Reading Delta Crank Revolution(s)
- [x] Reading Delta Wheel Event Time
- [x] Reading Delta Wheel Revolution(s)

- [x] Reading Manufacterer Name
- [x] Reading Software Revision
- [x] Reading Firmware Revision
- [x] Reading Bike Model Revision
- [x] Reading Bike Model

![image](https://user-images.githubusercontent.com/10961012/125396098-143d2980-e37a-11eb-94a5-4c8536e58d8f.png)

## Table of Contents

- [Installation](#installation)
- [Built With](#built-with)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)

## Installation

Installing involves visiting [REX](https://rex.fitness/) and selecting the install button as indicated in this screenshot (using chrome).
![Chrome](https://user-images.githubusercontent.com/10961012/124973075-eeadca00-dfdf-11eb-9c40-44fcadf219ce.png)

## Built With

- [Angular](https://angular.io/) Web Framework
- [Angular Material](https://material.angular.io) Web Style Patterns
- [ESLint](https://eslint.org) Style Adherence
- [Express](https://expressjs.com) API Server
- [Jest](https://jestjs.io) Frontend Testing
- [Node JS](https://nodejs.org/en/) Backend
- [Nx](https://nx.dev) Complexity Management
- [NGINX](https://www.nginx.com/) Web Server
- [NgRx](https://ngrx.io/) Frontend State Management
- [Linode](https://linode.com) Deployment
- [PW2](https://pm2.keymetrics.io/) NodeJS Process Manager
- [Redis](https://redislabs.com/) Standalone Database

## Usage

1.  Visit [rex.fitness](https://rex.fitness)
2.  Login in / create account
    1.  If not automatically redirected.
    2.  Visit [rex.fitness/main](https://rex.fitness/main)
3.  Connect to your exercise bike using the connect floating action button
4.  Once paired with your bike verify you can get information from it by pedaling
5.  Select options availible to you by joining a group session, or solo riding with the provided workouts.

## Contributing

1. Select a task from the availible issues.
2. Clone the git repository and checkout the develop branch if not already on it by default.
3. Ensure you have `nx` installed globally via your flavor of package manager.
4. Ensure you have at least `nodejs 14.x` installed.
5. At a mimimum if you've added code, add tests and run them locally.
   1. run `nx affected:test --base=remotes/origin/develop --head=HEAD` to execute unit tests using [jest](https://jestjs.io)
   2. run `nx affected:lint --base=remotes/origin/develop --head=HEAD` to execute linting affected by the change.
6. Update Documentation as needed.
7. Pull Request
   1. Open a Pull request against the original branch `develop`
   2. Your pull request will build and additional code quality checks will be made.
   3. Be open to criticism after all we're human all human... right? 🤖

## Credits

[Benjamin Benson](https://github.com/BensonBen),
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
