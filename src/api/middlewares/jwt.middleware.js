const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const {User, Game} = require("@database/database");
const {verifyJWT} = require("../../lib/utils/encryption");

module.exports = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "No token provided"});
        const token = authHeader.split(" ")[1];
        if(!token) return res.status(StatusCodes.UNAUTHORIZED).json({message: "No token provided"});
        let decodedToken;
        try{
            decodedToken = verifyJWT(token, process.env.JWT_KEY);
        }catch(e){
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid token", error: e});
        }
        if(!decodedToken) return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid token"});
        const user = await User.findOne({where: {id: decodedToken.id}});
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        const jsonUser = user.toJSON();
        delete jsonUser.password;
        // Check if game is active
        const activeGame = await Game.findOne({where: {is_finished: false, user_id: user.id}});
        if(activeGame) jsonUser.gameId = activeGame.id;
        req.user = jsonUser;
        next();
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }

};
