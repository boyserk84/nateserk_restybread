# Auth0 Setup

Author: Nate K. (nkemavaha@gmail.com)

# Requirements
* Create Auth0 Account at https://www.auth0.com (it's FREE).
* Understanding JWT (Json Web Token)

# Overview
User registers or logs in to your website with your `Auth0 client` as Authentication middleware.

Once the user is successfully logged in, the user will receive `access_token` and redirect to a callback URL.

User will use `access_token` as a part of `Authorization: bearer` header when making a request to your API endpoint.

Your API endpoint will check `access_token` against your `Auth0 API` credentials.

# How to protect your API endpoint with Auth0 Guide

## 1. Setup Auth0 API for your REST API endpoint.
1. Once Auth0 account has been created, go to `APIS` section.
2. Click `CREATE API`
3. Fill out `Name`, `Identifier` (Recommend by Auth0: Your API URL), and `Signing Algorithm` (Default is RS256, Asymmetry).
4. Go to `Scopes` and create a new one.
5. Under `Non Interactive Clients` expand `Authorized` and check the scope you just created and then click `Update`.

## 2. Setup Auth0 Client for your Frontend
1. Once Auth0 account has been created, go to `Clients` section.
2. Click `CREATE CLIENT`
3. Fill out `NAME` and type of client (either Web Application or Single-page application).
4. Under `Settings` tab, fill out `Allowed Callback URLs` with your URLs (i.e. http://localhost:3000/callback). This should be URL where user is redirected once authentication succeeds.
5. (Optional) Fill out `Allowed Logout URLs` with your URLs.
5. Click `SAVE CHANGES`

# Integrate Auth0

## 1. How to Integrate Auth0 with your API endpoint
1. Enable (aka uncomment) `Auth0` Strategy in `index.js` in `plugins` array.
```
{
    // Auth0 Authentication , by default enforce on all routes unless specify otherwise.
    register: Auth0
},
```
By default, this will enforce all endpoints to be authenticated due to `DEFAULT_AUTH_MODE` config defined in `.env`.

`DEFAULT_AUTH_MODE` refers to `MODE` config parameter in `Hapi.js`. Its value could either be `true`, `false`, `required`, `optional`, or `try`.

See https://hapijs.com/tutorials/auth for more details.


Optional: If you prefer a certain endpoint to NOT be authenticated, you just need to set `auth` to `false` in the route config.
For example,
```
{
    method: 'GET',
    ....
    config: {
      auth: false,
      handler:....
    }

},
```
2. Enable `example` endpoint from `index.js` (for the sake of testing) or you can use any endpoint/route you have.

3. Update `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` in `config/.env` with your `Auth0 Client` and `Auth0 API`.

4. Launch your application `npm start`.

5. Try to make a cURL request to `http://localhost:8000/restricted` without authorization header.

6. You should get `401` response (aka Unauthorized).

7. To make a request with authorization header,
```
curl -v -H "Authorization: Bearer YOUR_TOKEN_HERE" -XGET "http://localhost:8000/restricted"

```

If the invalid token being used, you will get `403` response (aka Forbidden).

## General Flow
Generally, to receive a valid token for `Auth0 API`, user will need to log-in via your `Auth0 Client` with his/her credential.

The user will `access_token`, which will be used for authentication when making a request to your application endpoint (aka API).

Once the user make a request to your application endpoint, your application `validateFunc` method in `authentication/auth0.js` will validate a decoded version of `access_token` with your application-specific logic (i.e. revoked token, etc). If successfully pass, the user will have an access to your application endpoint.
Otherwise, the user will be rejected.


## How to Manually Get a Valid Token
1. Go to Auth0 Dashboard and click `APIS`.

2. Click at your target `API Audience`.

3. Click `Test` tab.

4. Click `Authorize Clients ...`

5. Look at `Sending the token to the API` section for your token.

6. Try making a request with this token to your API and you should get `200` response.


## 2. How to Integrate Auth0 with your Front End
There are many examples of `Auth0 Client` integration at https://github.com/auth0-samples.

i.e. - you can fork or clone one of the following repositories:
* React.js https://github.com/auth0-samples/auth0-react-samples
* Jquery https://github.com/auth0-samples/auth0-jquery-samples
* Php https://github.com/auth0-samples/auth0-php-web-app

### Things to keep in mind
* Your frontend will be mapped to your `Auth0 Client`.
* Your application will need to specify which `Audience` (aka your `Auth0 API`)'s `access_token` refers to.
* During the initialization of `Auth0` object in your front end application, you will need to specify `scope`.
This refers `scopes` you defined in your `Auth0 API`. By default (from Auth0 example), it will ask for `openid profile read:messages`.
`openid` and `profile` are default by Auth0. You can exclude them if you'd like. `read:messages` can be replaced by your own `Auth0 API`'s `scopes`.
* You can think of `scope` as a permission or Authorization for user do things on your api endpoint.
* If `scope` doesn't match, user will be rejected -- meaning no more or no less.
* To enable `scope` verification in your endpoint, you need to add `scope` to your `auth` config object,
For example
```
{
    method: 'GET',
    ...
    config: {
       auth: {
         scope: 'openid YOUR_API_SCOPE',
      },
}
```

# NOTE
* `Audience` refers to `unique identifier` or `Identifier` for the API. You will need to define `AUTH0_AUDIENCE` in `.env` with this value.
* You can add and persist user's app specific data on `user.app_metadata`. This can be done via `Rules` or manually call to Auth0 api.
