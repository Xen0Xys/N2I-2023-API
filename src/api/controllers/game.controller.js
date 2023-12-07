const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const {Game} = require("@database/database");
const {generateJWT} = require("../../lib/utils/encryption");

async function startGame(req, res){
    try{
        const userId = req.user.id;
        // Check for active game
        const activeGame = await Game.findOne({where: {is_finished: false, user_id: userId}});
        if(activeGame)
            await activeGame.destroy();
        // Create new game
        const game = await Game.create({user_id: userId});
        const token = generateJWT({id: userId, game_id: game.id}, process.env.TOKEN_DURATION, process.env.JWT_KEY, true);
        const result = {game: game.toJSON(), token: token};
        return res.status(StatusCodes.OK).json(result);
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

async function getGame(req, res){
    try{
        const gameId = req.user.game_id;
        const game = await Game.findByPk(gameId);
        if(!game) return res.status(StatusCodes.NOT_FOUND).json({message: "Game not found"});
        return res.status(StatusCodes.OK).json({game: game.toJSON()});
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

module.exports = {
    startGame,
    getGame,
};
