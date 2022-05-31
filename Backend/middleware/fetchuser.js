var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mohitsainiislearningreact';

// Get the user from the jwt token sent along with the request , we will get our token from request using header auth-token.
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenicate using a valid token" })
    }

    try {

        /* 
            verify will return the payload or the data that we sent while user creation
            JWT_SECRET is the way we had signed the token and it is the means of verifying our token.
        */

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

        // here the next refers to the async function in our post: : /api/auth/getuser
    } catch (error) {
        res.status(401).send({ error: "Please Authenicate using a valid token" })
    }
}
module.exports = fetchuser;


