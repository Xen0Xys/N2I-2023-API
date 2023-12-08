const gameJwtAuth = require("@middlewares/game-jwt.middleware");
const {generateNextRound, getCurrentRound, takeAnswer} = require("@controllers/round.controller");

module.exports = (router) => {
    router.post("/round/next",
        gameJwtAuth,
        async(req, res) => {
            await generateNextRound(req, res);
        });
    router.get("/round/current",
        gameJwtAuth,
        async(req, res) => {
            await getCurrentRound(req, res);
        });
    router.post("/round/answer/:round_type/:round_id",
        gameJwtAuth,
        async(req, res) => {
            await takeAnswer(req, res);
        });
};
