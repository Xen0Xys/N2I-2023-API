const {StatusCodes} = require("http-status-codes");
const testConfig = require("./config");
const jwt = require("jsonwebtoken");
const {api, expect, chai} = testConfig;

const testUserData = {
    username: "Test2",
    password: "Test2"
};

let testUser;
let gameId;

describe("Game tests", async() => {
    before(async() => {
        const res = await chai.request(api).post("/api/v1/user").send(testUserData);
        expect(res).to.have.status(StatusCodes.CREATED);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("token");
        // Check that token only have id
        const decodedToken = jwt.decode(res.body.token);
        expect(decodedToken).to.have.property("id");
        expect(decodedToken).to.not.have.property("game_id");

        testUser = res.body;
    });
    it("Get game without token", async() => {
        const res = await chai.request(api).get("/api/v1/game");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Get game with invalid token", async() => {
        const res = await chai.request(api).get("/api/v1/game").set("Authorization", "Bearer " + "invalid");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Get game with only id in token", async() => {
        const token = jwt.sign({id: testUser.id}, process.env.JWT_KEY, {expiresIn: process.env.TOKEN_DURATION});
        const res = await chai.request(api).get("/api/v1/game").set("Authorization", "Bearer " + token);
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Start game without token", async() => {
        const res = await chai.request(api).post("/api/v1/game");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Start game with invalid token", async() => {
        const res = await chai.request(api).post("/api/v1/game").set("Authorization", "Bearer " + "invalid");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Start game", async() => {
        const res = await chai.request(api).post("/api/v1/game").set("Authorization", "Bearer " + testUser.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body.game).to.be.an("object");
        expect(res.body.game).to.have.property("id");
        expect(res.body.game).to.have.property("user_id");
        expect(res.body.game).to.have.property("score");
        expect(res.body.game).to.have.property("current_progress");
        expect(res.body.game).to.have.property("is_finished");
        gameId = res.body.game.id;
        const decodedToken = jwt.decode(res.body.token);
        expect(decodedToken).to.have.property("id");
        expect(decodedToken).to.have.property("game_id");
        testUser.token = res.body.token;
    });
    it("Get game", async() => {
        const res = await chai.request(api).get("/api/v1/game").set("Authorization", "Bearer " + testUser.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("game");
        expect(res.body.game).to.be.an("object");
        expect(res.body.game).to.have.property("id");
        expect(res.body.game).to.have.property("user_id");
        expect(res.body.game).to.have.property("score");
        expect(res.body.game).to.have.property("current_progress");
        expect(res.body.game).to.have.property("is_finished");
        expect(res.body.game.id).to.equal(gameId);
    });
    it("Start game with active game", async() => {
        const res = await chai.request(api).post("/api/v1/game").set("Authorization", "Bearer " + testUser.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body.game).to.be.an("object");
        expect(res.body.game).to.have.property("id");
        expect(res.body.game).to.have.property("user_id");
        expect(res.body.game).to.have.property("score");
        expect(res.body.game).to.have.property("current_progress");
        expect(res.body.game).to.have.property("is_finished");
        const decodedToken = jwt.decode(res.body.token);
        expect(decodedToken).to.have.property("id");
        expect(decodedToken).to.have.property("game_id");
        expect(res.body.gameId).to.not.equal(gameId);
    });
    it("Check if user have active game", async() => {
        const res = await chai.request(api).get("/api/v1/login").set("Authorization", "Bearer " + testUser.token);
        expect(res).to.have.status(StatusCodes.ACCEPTED);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("game_id");
    });
});
