
# FTAuth 
[![Build Status](https://travis-ci.com/jurelmartin/FTAuth.svg?branch=master)](https://travis-ci.com/jurelmartin/FTAuth)
[![Coverage Status](https://coveralls.io/repos/github/jurelmartin/FTAuth/badge.svg?branch=master)](https://coveralls.io/github/jurelmartin/FTAuth?branch=master)
[![npm version](https://badge.fury.io/js/ftauth.svg)](https://badge.fury.io/js/ftauth)

Final Task - Authentication and Authorization

## Install
    $ npm install FTAuth

## Usage

This package provides a functuion that acts as a middleware that you can use for Authenticating and Authorizing User depending on their Role (Admin, User).

Example of How to use the functions, 

For Creating a token

```javascript
const {generateToken} = require('FTAuth');

exports.login = (req, res, next) => {

    const userRole = Role.User
    const token = generateToken(1, userRole,"supersecretkey", '1h', '24hr');

    if (token === undefined) {
        console.log('error');
    }

    return res.status(200).json({status: "200", message: 'login success', token: token});
};
```

For Issuing a new token by refresh token

```javascript
exports.issueNewToken = (req, res, next) => {

    const refreshToken = req.params.refreshToken;

    if (req.refreshToken === refreshToken)
    {
        const newToken = generateToken(req.userId, req.role, 'supersecretkey', '1h', '24h');
        res.status(200).json({message: "New token generated", token: newToken});
    }else{
        res.status(401).json({message: "failed to generate new token"});
    }
};
```
For Verifying token

```javascript

const {verifyToken} = require('FTAuth');
const {setCurrentRole} = require('FTAuth')


module.exports = (req, res, next) => { 
    const authHeader = req.get('Authorization');

    const decodedToken = verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    // put the decoded refresh token to request
    req.refreshToken = decodedToken.refreshToken;

    // set User's role for the checkUser function
    setCurrentRole(decodedToken.role);

    next();

};
```


### Using it as a middleware



```javascript
const {checkUser} = require('FTAuth');
const Role = require('FTAuth/_helper');
const tokenChecker = require('./tokenChecker')
```
> The code behind tokenChecker (or your middleware): 
```javascript
const {verifyToken} = require('FTAuth');
const {setCurrentRole} = require('FTAuth')


module.exports = (req, res, next) => { 
    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    // put the decoded refresh token to request
    req.refreshToken = decodedToken.refreshToken;

    // set User's role for the checkUser function
    setCurrentRole(decodedToken.role);

    next();

}

```

> Example when using a use case

```javascript
app.use('/token/:refreshToken',tokenChecker, issueNewToken);
```

What this does is:
1.) Authenticate the route first
2.) If it succeeds, Will create a new token 

