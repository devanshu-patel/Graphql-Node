<h1 align="center">
  	<span>GraphQL</span>
</h1>

---

## Requirements

-   Install nvm(Node version manager) by using command
    ```sh
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```
-   Installing Nodejs
    ```sh
    nvm install 16.13.1
    ```
-   NPM version 6.14.4 or higher. See [here](https://www.npmjs.com/get-npm) for install instructions.
   

## Installation


-   install all modules

    ```sh
    npm install --save
    ```

    ```sh
    yarn
    ```
    

## start application

-   If you want to start application

    ```sh
    npm start
    ```

    ```sh
    yarn start
    ```
### API Endpoints

-  Admin EndPoints

    http://localhost:8000/graphlql

### .ENV

- Follow this .env for development purpose
    ```sh
    #Database info
    CONNECTION_SRTING="mongodb://127.0.0.1:27017/event_registration"
    #app port
    PORT=8000
    #access token's secret generated at signin
    ACCESS_TOKEN_SECRET="ACCESS_TOKEN_SECRET"
    #access token encry key
    KEY_ENCRYPT_DECRYPT="KEY_ENCRYPT_DECRYPT"
    ```

## Error Codes

- 500 - internal server error occurred, please try again
- 400 - invalid arguments, please try again
- 404 - data not found, please try again
- 401 - unauthorized request, please check again
- 403 - forbidden request, please check login credentials
- 409 - conflict happened, we do not allow duplicate entries, please try   again.
- 200 - successful request

## Token Details

- Access Token = access token is a JWT signed token which will be used for all apis in application it has expiry time of 24 hrs.