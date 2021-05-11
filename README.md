# ASAPP Chat Backend Challenge v1
## Overview
This is a TypeScript based boilerplate which runs an HTTP Server configured to answer the endpoints defined in 
[the received challenge](https://backend-challenge.asapp.engineering/).
All endpoints are configured in [src/controllers](https://github.com/Batta32/asapp-challenge/tree/master/src/controllers) folder and if you go deeper to the controllers, you will see the specific implementation of each one.

## Prerequisites

- Clone the repository
    ```bash
    git clone https://github.com/Batta32/asapp-challenge.git
    ```
- Install [Docker](https://www.docker.com/products/docker-desktop)
- Install [NodeJS](https://nodejs.org/en/download/)
- Install [Postman](https://www.postman.com/downloads/)

## To try this sample
> The sample uses the port 8080 by default.

### Using Docker
1. Open a terminal
1. Pull [Docker image for ASAPP challenge](https://hub.docker.com/r/batta32/asapp-challenge)
    ```bash
    docker pull batta32/asapp-challenge
    ```
1. Run the downloaded container in port 8080
    ```bash
    docker run -p 8080:8080 -it batta32/asapp-challenge
    ```
1. Hit the supported endpoints specified [here](#supported-endpoints) using Postman

### Locally
1. Open a terminal
1. Go to the location of the cloned project
1. Install the dependencies of the sample
    ```bash
    npm install
    ```
1. Start the sample
    ```bash
    npm run start
    ```
1. Hit the supported endpoints specified [here](#supported-endpoints) using Postman

### Supported endpoints
- `POST /health`: check the health of the system
- `POST /users`: create a user in the system
- `POST /login`: log in as an existing user
- `POST /messages`: send a message from one user to another
- `GET /messages`: fetch all existing messages to a given recipient, within a range of message IDs

### Further Reading
- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)