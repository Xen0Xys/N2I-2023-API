/* eslint-disable no-unused-vars */
const jwtAuth = require("@middlewares/jwt.middleware");
const gameJwtAuth = require("@middlewares/game-jwt.middleware");
const {generateNextRound} = require("@controllers/round.controller");

module.exports = (router) => {
    router.post("/round/next",
        jwtAuth,
        async(req, res) => {
            await generateNextRound(req, res);
        });
    router.get("/round/current",
        gameJwtAuth,
        async(req, res) => {
            // TODO
        });
    router.post("/round/answer/:round_type/:round_id",
        gameJwtAuth,
        async(req, res) => {
            // TODO
        });
};
