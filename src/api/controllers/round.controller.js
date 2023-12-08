const roundService = require("@services/round.service");
const {StatusCodes} = require("http-status-codes");

async function generateNextRound(req, res){
    try{
        const round = await roundService.getNextRound(req.user.game_id);
        if(!round)
            return res.status(StatusCodes.NOT_FOUND).json({message: "Game is finished"});
        return res.status(StatusCodes.OK).json(round);
    } catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error"});
    }
}

module.exports = {
    generateNextRound,
};
