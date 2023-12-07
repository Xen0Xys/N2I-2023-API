const {validate} = require("express-validation");
const {StatusCodes} = require("http-status-codes");
const jwtAuth = require("@middlewares/jwt.middleware");
const {startGame} = require("@controllers/game.controller");

module.exports = (router) => {
    router.post("/game",
        jwtAuth,
        async(req, res) => {
            await startGame(req, res);
        });
};
