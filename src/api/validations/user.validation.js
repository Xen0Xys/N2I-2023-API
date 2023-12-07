const {Joi} = require("express-validation");

const login = {
    body: Joi.object({
        username: Joi.string().max(30).required(),
        password: Joi.string().max(30).required()
    })
};

const create = {
    body: Joi.object({
        username: Joi.string().max(30).required(),
        password: Joi.string().max(30).required()
    })
};

module.exports = {
    login,
    create
};
