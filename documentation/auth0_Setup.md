# Auth0 Setup

Author: Nate K. (nkemavaha@gmail.com)

# Requirements
* Create Auth0 Account at https://www.auth0.com (it's FREE).
* Understanding JWT (Json Web Token)

# Overview
User registers or logs in to your website with your `Auth0 client` as Authentication middleware.
Once the user is successfully logged in, the user will receive `access_token` and redirect to a callback URL.
User will use `access_token` as a part of `Authorization: bearer` header when making a request to your API endpoint.
Your API endpoint will check `access_token` against your `Auth0 API`.

# How to protect your API endpoint with Auth0 Guide

# Setup Auth0 Client and API

# 1. Setup Auth0 API for your REST API endpoint.
1. Once Auth0 account has been created, go to `APIS` section.
2. Click `CREATE API`
3. Fill out `Name`, `Identifier` (Recommend by Auth0: Your API URL), and `Signing Algorithm` (Default is RS256, Asymmetry).
4. Go to `Scopes` and create a new one.
5. Under `Non Interactive Clients` expand `Authorized` and check the scope you just created and then click `Update`.

# 2. Setup Auth0 Client for your Frontend
1. Once Auth0 account has been created, go to `Clients` section.
2. Click `CREATE CLIENT`
3. Fill out `NAME` and type of client (either Web Application or Single-page application).
4. Under `Settings` tab, fill out `Allowed Callback URLs` with your URLs (i.e. http://localhost:3000/callback). This should be URL where user is redirected once authentication succeeds.
5. (Optional) Fill out `Allowed Logout URLs` with your URLs.
5. Click `SAVE CHANGES`

# Integrate Auth0 API and Client with your Frontend and API endpiont

# How to Integrate Auth0 with your API endpoint
TBA

# How to Integrate Auth0 with your Front End
TBA

# NOTE
* `Audience` refers to `unique identifier` or `Identifier` for the API. You will need to define `AUTH0_AUDIENCE` in `.env` with this value.
* You can add and persist user's app specific data on `user.app_metadata`. This can be done via `Rules` or manually call to Auth0 api.
