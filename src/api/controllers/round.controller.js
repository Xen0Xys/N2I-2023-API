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

async function getCurrentRound(req, res){
    try{
        const currentRound = await roundService.getCurrentRound(req.user.game_id);
        if(currentRound.error)
            return res.status(StatusCodes.BAD_REQUEST).json({message: currentRound.error});
        return res.status(StatusCodes.OK).json(currentRound);
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error"});
    }
}

async function takeAnswer(req, res){
    try{
        const answerResult = await roundService.takeAnswer(req.user.game_id, req.params.round_id, req.body.answer);
        if(!answerResult)
            return res.status(StatusCodes.NOT_FOUND).json({message: "Game is finished"});
        return res.status(StatusCodes.OK).json(answerResult);
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error"});
    }
}

module.exports = {
    generateNextRound,
    getCurrentRound,
    takeAnswer,
};
