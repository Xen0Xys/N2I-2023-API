const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const {User, Game} = require("@database/database");
const encryption = require("@utils/encryption");

async function checkUserLogin(req, res){
    try{
        return res.status(StatusCodes.ACCEPTED).json(req.user);
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

async function createUser(req, res){
    try{
        const {username, password} = req.body;
        const hashedPassword = await encryption.hashPassword(password, 12);
        // Check if user already exists
        const userExists = await User.findOne({where: {username: username}});
        if(userExists) return res.status(StatusCodes.CONFLICT).json({message: "User already exists"});
        // Create user
        const user = await User.create({username: username, password: hashedPassword});
        const jsonUser = user.toJSON();
        delete jsonUser.password;
        jsonUser.token = encryption.generateJWT({id: user.id}, process.env.TOKEN_DURATION, process.env.JWT_KEY, true);
        return res.status(StatusCodes.CREATED).json(jsonUser);
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

async function loginUser(req, res){
    try{
        const {username, password} = req.body;
        // Check if user exists
        const user = await User.findOne({where: {username: username}});
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        // Check if password is correct
        if(await encryption.comparePassword(user.password, password)){
            const tokenContent = {id: user.id};
            // Check if game is already started
            const game = await Game.findOne({where: {user_id: user.id, is_finished: false}});
            if(game)
                tokenContent.game_id = game.id;
            const token = encryption.generateJWT(tokenContent, process.env.TOKEN_DURATION, process.env.JWT_KEY, true);
            const jsonUser = user.toJSON();
            delete jsonUser.password;
            jsonUser.token = token;
            return res.status(StatusCodes.OK).json(jsonUser);
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid password"});
    }catch (e){
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    }
}

module.exports = {
    checkUserLogin,
    createUser,
    loginUser,
};

