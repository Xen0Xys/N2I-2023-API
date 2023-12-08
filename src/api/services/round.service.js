/* eslint-disable no-unused-vars,no-case-declarations */
const {Game, QuizData, QuizRounds, InfoData, InfoRounds, RightPriceData, RightPriceRounds, MemoryData, MemoryRounds} = require("@database/database");
const {StatusCodes} = require("http-status-codes");

// const typeSuite = ["quiz", "right_price", "info", "right_price", "memory", "info", "quiz", "quiz", "right_price", "info"];
const typeSuite = ["quiz", "info", "right_price", "right_price", "memory", "info", "quiz", "quiz", "right_price", "info"];

async function getCurrentRound(gameId){
    const game = await Game.findOne({where: {id: gameId}});
    if(!game)
        return null;
    const gameType = typeSuite[game.current_progress - 1];
    if(!gameType)
        return null;
    const roundModel = await getModel(gameType);
    const round = await roundModel.findOne({where: {game_id: gameId}, order: [["id", "DESC"]]});
    const base = {
        round_id: round.id,
        round_type: gameType,
    };
    switch (gameType){
    case "quiz":
        return await getCurrentQuizRound(base, round);
    case "info":
        const infoData = await InfoData.findOne({where: {id: round.info_data_id}});
        return {
            ...base,
            type: infoData.type,
            url: infoData.url,
            title: infoData.title,
            content: infoData.content
        };
    case "memory":
        return null;
    case "right_price":
        const rightPriceData = await RightPriceData.findOne({where: {id: round.right_price_data_id}});
        return {
            ...base,
            image: rightPriceData.image,
            question: rightPriceData.question,
            order_of_magnitude: rightPriceData.order_of_magnitude,
        };
    }
}

async function getCurrentQuizRound(base, round){
    const quizData = await QuizData.findOne({where: {id: round.quiz_data_id}});
    if(!round.is_finished){
        const answers = [quizData.right_answer, quizData.wrong_answer_1, quizData.wrong_answer_2, quizData.wrong_answer_3];
        shuffleList(answers);
        return {
            ...base,
            image: quizData.image,
            question: quizData.question,
            current_score: round.current_score,
            answers
        };
    }
    return {
        ...base,
        image: quizData.image,
        question: quizData.question,
        answers: round.answers,
        is_finished: true,
    };
}

async function getNextRound(gameId){
    const game = await Game.findOne({where: {id: gameId}});
    // Increment current_progress
    if(game.current_progress >= 10)
        return null;
    game.current_progress += 1;
    await game.save();
    // Get round type
    const roundType = await getNextRoundType(gameId);
    if(!roundType)
        return null;
    // Generate next round
    switch (roundType){
    case "quiz":
        return generateQuizRound(gameId);
    case "info":
        return generateInfoRound(gameId);
    case "memory":
        return generateMemoryRound(gameId);
    case "right_price":
        return generateRightPriceRound(gameId);
    }
}

async function getModel(gameType){
    switch (gameType){
    case "quiz":
        return QuizRounds;
    case "info":
        return InfoRounds;
    case "memory":
        return MemoryRounds;
    case "right_price":
        return RightPriceRounds;
    }
}

async function takeAnswer(gameId, roundId, answer){
    // TODO: WIP
    const game = await Game.findOne({where: {id: gameId}});
    if(!game)
        return null;
    const gameType = typeSuite[game.current_progress - 1];
    if(!gameType)
        return null;
    const roundModel = await getModel(gameType);
    const round = await roundModel.findOne({where: {game_id: gameId}, order: [["id", "DESC"]]});
    switch (gameType){
    case "quiz":
        return await takeQuizAnswer(round, answer);
    default:
        return null;
    }
}

async function takeQuizAnswer(round, answer){
    const quizData = await QuizData.findOne({where: {id: round.quiz_data_id}});
    return {
        is_correct: answer === quizData.right_answer,
    };
}

async function getNextRoundType(gameId){
    const game = await Game.findOne({where: {id: gameId}});
    return typeSuite[game.current_progress - 1];
}

async function generateQuizRound(gameId){
    const quizData = await QuizData.findAll();
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const currentQuizData = quizData[randomIndex];
    const round = await QuizRounds.create({
        game_id: gameId,
        quiz_data_id: currentQuizData.id,
    });
    const answers = [currentQuizData.right_answer, currentQuizData.wrong_answer_1, currentQuizData.wrong_answer_2, currentQuizData.wrong_answer_3];
    shuffleList(answers);
    return {
        round_type: "quiz",
        round_id: round.id,
        image: currentQuizData.image,
        question: currentQuizData.question,
        answers: answers
    };
}

async function generateInfoRound(gameId){
    const infoData = await InfoData.findAll();
    const randomIndex = Math.floor(Math.random() * infoData.length);
    const currentInfoData = infoData[randomIndex];
    const round = await InfoRounds.create({
        game_id: gameId,
        info_data_id: currentInfoData.id,
    });
    return {
        round_type: "info",
        round_id: round.id,
        type: currentInfoData.type,
        url: currentInfoData.url,
        title: currentInfoData.title,
        content: currentInfoData.content
    };
}

async function generateMemoryRound(gameId){
    // TODO
}

async function generateRightPriceRound(gameId){
    const rightPriceData = await RightPriceData.findAll();
    const randomIndex = Math.floor(Math.random() * rightPriceData.length);
    const currentRightPriceData = rightPriceData[randomIndex];
    const round = await RightPriceRounds.create({
        game_id: gameId,
        right_price_data_id: currentRightPriceData.id,
    });
    return {
        round_type: "right_price",
        round_id: round.id,
        image: currentRightPriceData.image,
        question: currentRightPriceData.question,
        order_of_magnitude: currentRightPriceData.order_of_magnitude,
    };
}

function shuffleList(list){
    list.sort((a, b) => 0.5 - Math.random());
}

module.exports = {
    getNextRound,
    getCurrentRound,
    takeAnswer,
};
