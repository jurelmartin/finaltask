const jwt = require('jsonwebtoken');

exports.generateToken = (id, key, accessTokenExpiration) => {
    try {
        const token = jwt.sign({
            id
        },
        key,{ expiresIn: accessTokenExpiration });
        const tokenResponse = {
            "token": token
        }
        return tokenResponse;
    } 
    catch(err){
        return false;
    }
};

exports.verifyToken = (authHeader, key) => {
    if (!authHeader) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, key);
        return decodedToken;
    }
    catch (err) {
        return false;
    }
};
