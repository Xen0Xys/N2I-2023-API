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
        if(!decodedToken.game_id) return res.status(StatusCodes.UNAUTHORIZED).json({message: "Missing game id in token"});
        const user = await User.findOne({where: {id: decodedToken.id}});
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        const jsonUser = user.toJSON();
        delete jsonUser.password;
        // Get db active game id
        const activeGame = await Game.findOne({where: {is_finished: false, user_id: user.id}});
        // if(activeGame) jsonUser.game_id = activeGame.id;
        if(activeGame){
            if(activeGame.id === decodedToken.game_id)
                jsonUser.game_id = activeGame.id;
            else
                return res.status(StatusCodes.CONFLICT).json({message: "Database active game id is different from token game id"});
        }else{
            jsonUser.game_id = decodedToken.game_id;
        }
        req.user = jsonUser;
        next();
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }

};
