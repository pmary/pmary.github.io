---
layout: post
title:  "My 2017 application development workflow"
date:   2017-11-02 13:46:40
categories: vuejs express workflow
comments: true
---

http://vuetips.com/use-docker-containers
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

I use to develop all my projects with Meteor.
But some times, you need to detach the front from the back. Years ago, I was
using Angular 1 for the front and a PHP framework to develop an API for the back.
But today I would like to introduce you my new full stack workflow.

I'm using Vue.js for the front, Express as back.

# Setup your local environment
Dealing with multiple projects and there technical requirement can be really
painful. But when you have two projects who need different versions of the same
environment, it become a nightmare. And what if you want your local env
to be the same as the production env? Let say you are developing a PHP app with
the WAMP stack on your computer and you deploy on a LAMP.
I struggled with this considerations for a while trying Vagrant and VirtualBox
VM's but it never perfectly fit my needs.
And one day, I heard of Docker.

## Enter Docker
> Docker provides an additional layer of abstraction and automation of operating-system-level virtualization on Windows and Linux.

So what's the difference with Vagrant/VirtualBox?
Apart from the performance considerations, Docker allows you to build your
application infrastructure as you wish. You determine the parts and services you
need and stack them together like Lego blocks. It create what we call a "container"
And the beauty of this is that you can deploy this container anywhere:
- upgrade your local Node version without risking to break your app’s dependencies
(and avoid using clever hacks to make sure each project uses the correct Node version)
- be 100% sure that all developers of your team are using the same version of
Node, even across different operating systems (prevents NPM dependencies issues)
- build your app in the exact same, secure, environment

## Build your development environment with Docker
So, in this guide we will build a local development setup using Docker to run an
Express application and a Vue.js app.

We'll have one container for Node.js, one container for Nginx, one container for
PostgreSQL and one container for Vue.js. Our configuration will bind them
altogether so we will just have to run one command line to build it, boot it and
view it locally on port 8080.

> Of course, my goal here is not to write an extensive tutorial on Docker. If you
need to learn more, I encourage you to go through the official [Docker documentation](https://docs.docker.com).

### Installing Docker
Just go to the [Docker Community Edition](https://www.docker.com/community-edition)
page and follow the instructions corresponding to your situation.

### Directory architecture
Create a new folder for our app and create two new subfolders:

```other
|- root directory
 |- server
  - Dockerfile
 |- client
  - Dockerfile
 - docker-compose.yml
```

### The Web Server
Create a new folder for your application and create a new file calle
`docker-compose.yml` in it. This file will define the configuration of our
multi-container Docker application.

```yaml
FROM node:9.0
EXPOSE 8000

# Install app dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --quiet
RUN mkdir -p /usr/src/app && cp -R /tmp/node_modules /usr/src/app

COPY . /usr/src/app/

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV ${NODE_ENV:-production}
CMD ["npm", "start"]
```

```yaml
version: '3'

services:
  postgres:
    image: postgres:9.6-alpine
    expose: 5432
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypostgrespassword

  server:
    build:
      context: server
      dockerfile: Dockerfile
    container-name: gamification-api
    environment:
      NODE_END: "production"
    port:
      - "8080:80"
```

# Vue.js

## Setup

# Server-side

## Swagger
The server-side of our application will be a simple web API. Every API need a
proper documentation so let me introduce Swagger, an open-source framework to
help you write RESTful and well documented APIs.

Not only does it enforce you to follow all of REST’s best practices, it also
provides a few very interesting tools that simplify the development process:
 - Swagger Editor: Let you design the API specification without writing a single
 line of code.
 - Swagger UI: Automatically builds beautiful documentation.
 -

First, install the swagger module
 ```bash
 $ npm install -g swagger
 ```

## Setup
From the root directory of our application, create a new swagger project:
```bash
$ swagger project create server
```

A prompt will ask you to select the framework, choose `express`.

We are now ready to start the design of our API in the Swagger Editor

## Design the API
https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger

Swagger come with an interactive, browser based editor. It provides:
- Validation and endpoint routing.
- Documentation generation on the fly.
- Easy-to-read Yaml.

You can run it with:
```bash
$ cd server
$ swagger project edit
```

It will then open the editor in your brother
![Swagger editor]({{ "/downloads/2017-11-02-application-development/swagger-editor_01.png" | absolute_url }}){:.post-screenshot}

Working with mocks does not require any code to be written. We will focus on the
design by just editing the yaml file.

The first thing to do in our application is to handle the users.

### POST /users/login
The first route

```yaml
paths:
  /user:
    x-swagger-router-controller: user
    get:
      operationId: getAll
      description: get the users list
      responses:
        "200":
          description: Success
          schema:
            $ref: "#/definitions/GetUsersListResponse"
        default:
          description: Error
          schema:
            $ref: "#/definitions/ErrorResponse"
```

### Authentication with JSON Web Tokens
See: http://miguelduarte.pt/2017/04/19/using-jwt-authentication-with-swagger-and-node-js/

Authentication is one of the big parts of every application. Security is always
something that is changing and evolving.

Swagger's specification allows for two types of mechanisms: OAuth, and what they
call "apiKey". Since JWT is definitely not OAuth, we have to use use "apiKey" to
define that the JWT token will be sent in the HTTP Authorization header as
"Bearer token_string":
```yaml
# server/api/swagger/swagger.yaml
securityDefinitions:
    Bearer:
        type: apiKey
        name: Authorization
        in: header
```

Furthermore, if we want to have different roles and manage the access to each API endpoint based on the user’s role, we will have to extend the Swagger spec, as it does not allow this for “apiKey” authentication. We can allow for role-based access as follows:
```yaml
paths:
  /user:
    x-swagger-router-controller: user
    get:
      security:
        - Bearer: []
      x-security-scopes:
        - admin
        - user
```

After the Swagger configuration is defined, we need to write the code to
actually make this work. In the app.js file:
```javascript
// /app.js
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);

  // Add this
  app.use(swaggerExpress.runner.swaggerTools.swaggerSecurity({
    // Manage token function in the 'auth' module
    Bearer: auth.verifyToken
  }));

  ...
})
```

As you can see in line 13, the security checks are handed off to the verifyToken
function in the auth module. Here is the code:
```javascript
// /api/helpers/auth.js

'use strict';

var jwt = require('jsonwebtoken');

exports.verifyToken = function (req, authOrSecDef, token, callback) {
  console.log('In verify token');
}
```

/*
Furthermore, if we want to have different roles and manage the access to each
API endpoint based on the user’s role, we will have to extend the Swagger spec,
as it does not allow this for "apiKey" authentication. We can allow for
role-based access as follows:


`Authorization` header when making requests to protected resources:
```
Authorization: Bearer <token>
```

**Note**: Because the token is easily decoded, Basic authentication should only
be used together with other security mechanisms such as HTTPS/SSL.


# Google Cloud Datastore
The Google Cloud Datastore is a NoSQL Database as a Service (DBaaS). It's a
document-oriented database system like MongoDB, CouchBase or Amazon DynamoDB.

It's a perfect fit if your data are structured, non relational and you don't
need Mobile SDK's or low-latency.

## Create the Datastore
First, login to the Could Platform and go to the [https://console.cloud.google.com/cloud-resource-manager](resources manager page)
and create a new project. I will call mine "App Project 2017".
Then go to the [](Datastore Entities page) and click **Create entity** and
select the region of your choice for your Datastore (you cannot change the
location after it has been saved).
The next form is similar to the creation of a new table in phpMyAdmin:

1. Leave the **Namespace** field unchanged.
2. **Kind**: This can be seen as the _collection_ in MongoDB or the _table_ in
MySQL in which you want to put your new entity. Type `Task`.
3. Under Properties use the **Add property** button to add these properties:
![Swagger editor]({{ "/downloads/2017-11-02-application-development/add_task_entity_properties.png" | absolute_url }}){:.post-screenshot}
4. Click **Create**.

You just stored your first Task in Cloud Datastore!
Now we will see how you to integrate the datastore to be used front our express
application.

## Datastore usage in Express
First we need to enable the Cloud Datastore API for the project.
From the console menu, go to **APIs & services** / **Library** and type search
for Google Cloud Datastore API and click **Enable**.
![Swagger editor]({{ "/downloads/2017-11-02-application-development/enable_google_cloud_atastore_api.png" | absolute_url }}){:.post-screenshot}

Then go to **APIs & services** / **Credentials**, click **Create credentials**
and choose **Service account key**.
As **Role** you can choose **Datastore** / **Cloud Datastore User**.
![Swagger editor]({{ "/downloads/2017-11-02-application-development/create_service_account_key.png" | absolute_url }}){:.post-screenshot}

Now, move the private key you just downloaded to
`server/data_store_account_key.json`.

Under the `server` directory, create a `settings.json` file with this content:
```json
{
  "gCloud": {
    "projectId": "[YOUR_PROJECT_ID]",
    "keyFilename": "./data_store_account_key.json"
  }
}
```
Where YOUR_PROJECT_ID is obviously your project ID.

> In `settings.json` we will store information like API keys, database
credentials and other sensitive informations. Be sure to not synchronize this
file to your repository by adding `settings.json` to the `.gitignore` file.

We install the Cloud Datastore client library for Node.js:
```bash
$ npm i @google-cloud/datastore --save
```

# Up our multi-container
```bash
docker-compose -f docker-compose.yml -p Gamification up
```
