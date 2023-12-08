/* eslint-disable no-unused-vars */
const {User, Game} = require("@database/database");
const {computeGameScore} = require("./game.controller");

async function getLeaderboard(req, res){
    const users = await User.findAll();
    const userLowerScores = [];
    console.log("=== Computing leaderboard ===");
    for(const user of users){
        console.log("Computing for user " + user.username);
        const userGames = await Game.findAll();
        const userScores = [];
        for(const userGame of userGames){
            console.log("Computing for game " + userGame.id);
            userScores.push(await computeGameScore(userGame.id));
        }
        if(userScores.length > 0)
            userLowerScores.push({username: user.username, score: Math.min(...userScores)});
    }
    console.log(userLowerScores);
    userLowerScores.sort((a, b) => b.score - a.score);
    console.log("=== End of leaderboard computation ===");
    return res.status(200).json({leaderboard: userLowerScores});
}

module.exports = {
    getLeaderboard,
};
