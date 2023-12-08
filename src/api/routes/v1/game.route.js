/* eslint-disable no-unused-vars */
const jwtAuth = require("@middlewares/jwt.middleware");
const gameJwtAuth = require("@middlewares/game-jwt.middleware");
const {startGame, getGame} = require("@controllers/game.controller");

module.exports = (router) => {
    router.post("/game",
        jwtAuth,
        async(req, res) => {
            await startGame(req, res);
        });
    router.get("/game",
        gameJwtAuth,
        async(req, res) => {
            await getGame(req, res);
        });
    router.get("/game/end",
        gameJwtAuth,
        async(req, res) => {
            // TODO
        });
};
