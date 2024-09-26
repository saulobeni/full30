const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');

const UserAuth = async (request, response, next) => {
    console.log(request.headers);

    let token = request.headers.authorization.replace('Bearer ', '');

    try {
        jwt.verify(token, process.env.SECRET);
    } catch (error) {
        response.status(401);
        console.log(error.message);
        return response.json({
            message: "Usuario não autorizado!"
        })
    }

    next();
}

module.exports = UserAuth;