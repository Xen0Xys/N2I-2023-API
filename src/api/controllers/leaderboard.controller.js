/* eslint-disable no-unused-vars */
const {User} = require("@database/database");

async function getLeaderboard(req, res){
    const users = await User.findAll();
}

module.exports = {
    getLeaderboard,
};
