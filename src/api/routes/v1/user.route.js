const {checkUserLogin, createUser, loginUser} = require("@controllers/user.controller");
const userValidation = require("@validations/user.validation");
const jwtAuth = require("@middlewares/jwt.middleware");
const {StatusCodes} = require("http-status-codes");
const {validate} = require("express-validation");

module.exports = (router) => {
    router.get("/login",
        jwtAuth,
        async(req, res) => {
            await checkUserLogin(req, res);
        });
    router.post("/login",
        validate(userValidation.login, {context: false, statusCode: StatusCodes.BAD_REQUEST, keyByField: false}),
        async(req, res) => {
            await loginUser(req, res);
        });
    router.post("/user",
        validate(userValidation.create, {context: false, statusCode: StatusCodes.BAD_REQUEST, keyByField: false}),
        async(req, res) => {
            await createUser(req, res);
        });
};
