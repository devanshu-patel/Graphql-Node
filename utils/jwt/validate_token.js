var jwt = require('jsonwebtoken');
const { decryptToken } = require('./encrypt_decrypt');

exports.validate_token = async (token, secret) => {
    try {

        //taking token from header
        let jwtToken = token;
        let tokenArray = jwtToken.split(" ");
        //decrypting token 
        let decrypt = decryptToken(tokenArray[1]);

        //verifying it
        var data = jwt.verify(decrypt, secret);

        return Promise.resolve({
            "email": data.email,
            "userId": data.userId
        })

    } catch (error) {
        return Promise.reject(error);
    }
}