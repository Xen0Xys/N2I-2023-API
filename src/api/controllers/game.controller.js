const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const {Game} = require("@database/database");

async function startGame(req, res){
    try{
        const userId = req.user.id;
        // Check for active game
        const activeGame = await Game.findOne({where: {is_finished: false, user_id: userId}});
        if(activeGame)
            await activeGame.destroy();
        // Create new game
        const game = await Game.create({user_id: userId});
        return res.status(StatusCodes.OK).json(game.toJSON());
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

module.exports = {
    startGame,
};
