const jwtAuth = require("@middlewares/jwt.middleware");
const {getLeaderboard} = require("@controllers/leaderboard.controller");

module.exports = (router) => {
    router.get("/leaderboard",
        jwtAuth,
        async(req, res) => {
            await getLeaderboard(req, res);
        });
};
