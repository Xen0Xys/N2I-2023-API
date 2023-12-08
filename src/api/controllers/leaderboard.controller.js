/* eslint-disable no-unused-vars */
const {User, Game} = require("@database/database");
const {computeGameScore} = require("./game.controller");

async function getLeaderboard(req, res){
    const users = await User.findAll();
    const userLowerScores = [];
    for(const user of users){
        const userGames = await Game.findAll();
        const userScores = [];
        for(const userGame of userGames)
            userScores.push(await computeGameScore(userGame.id));
        if(userScores.length > 0)
            userLowerScores.push({user: user, score: Math.min(...userScores)});
    }
    userLowerScores.sort((a, b) => b.score - a.score);
    return res.status(200).json({leaderboard: userLowerScores});
}

module.exports = {
    getLeaderboard,
};
