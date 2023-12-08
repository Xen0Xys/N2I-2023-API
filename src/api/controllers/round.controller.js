const roundService = require("@services/round.service");

async function generateNextRound(req, res){
    const round = await roundService.getNextRound(req.game.id);
    if(!round)
        return res.status(400).json({message: "Game is finished"});
    return res.status(200).json(round);
}

module.exports = {
    generateNextRound,
};
