const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const {Game, QuizRounds, RightPriceRounds} = require("@database/database");
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
        const jsonGame = game.toJSON();
        jsonGame.score = await computeGameScore(game.id);
        const result = {game: jsonGame, token: token};
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
        const jsonGame = game.toJSON();
        jsonGame.score = await computeGameScore(gameId);
        console.log(jsonGame);
        return res.status(StatusCodes.OK).json({game: jsonGame});
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

async function computeGameScore(gameId){
    const quizRounds = await QuizRounds.findAll({where: {game_id: gameId}});
    const rightPriceRounds = await RightPriceRounds.findAll({where: {game_id: gameId}});
    let score = 0;
    for(const quizRound of quizRounds)
        if(quizRound.is_finished)
            score += quizRound.current_score;
    for(const rightPriceRound of rightPriceRounds)
        if(rightPriceRound.is_finished)
            score += rightPriceRound.current_score;
    return score;
}

async function getGameRecap(req, res){
    try{
        // Recap is an array of objects {gameType, score} in order of created_at
        const gameId = req.user.game_id;
        if(!gameId) return res.status(StatusCodes.BAD_REQUEST).json({message: "Missing game id"});
        console.log(gameId);
        const game = await Game.findByPk(gameId);
        if(!game) return res.status(StatusCodes.NOT_FOUND).json({message: "Game not found"});
        if(!game.is_finished) return res.status(StatusCodes.BAD_REQUEST).json({message: "Game is not finished"});
        const quizRounds = await QuizRounds.findAll({where: {game_id: gameId}});
        const rightPriceRounds = await RightPriceRounds.findAll({where: {game_id: gameId}});
        const recap = [];
        for(const quizRound of quizRounds)
            if(quizRound.is_finished)
                recap.push({gameType: "Quiz", score: quizRound.current_score, createdAt: quizRound.created_at});
        for(const rightPriceRound of rightPriceRounds)
            if(rightPriceRound.is_finished)
                recap.push({gameType: "RightPrice", score: rightPriceRound.current_score, createdAt: rightPriceRound.created_at});
        recap.sort((a, b) => a.createdAt - b.createdAt);
        return res.status(StatusCodes.OK).json({recap: recap, score: computeGameScore(gameId)});
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

module.exports = {
    startGame,
    getGame,
    getGameRecap,
    computeGameScore,
};
