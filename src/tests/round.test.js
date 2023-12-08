const {StatusCodes} = require("http-status-codes");
const testConfig = require("./config");
const {api, expect, chai} = testConfig;

const testUser = {
    username: "Test3",
    password: "Test3"
};

let user;
let round;
describe("Round tests", async() => {
    before(async() => {
        // Create user
        const res = await chai.request(api).post("/api/v1/user").send(testUser);
        expect(res).to.have.status(StatusCodes.CREATED);
        user = res.body;
        // Start game
        const res2 = await chai.request(api).post("/api/v1/game").set("Authorization", "Bearer " + user.token);
        expect(res2).to.have.status(StatusCodes.OK);
        user.token = res2.body.token;
    });
    it("Get current round with no existing round", async() => {
        const res = await chai.request(api).get("/api/v1/round/current").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.BAD_REQUEST);
    });
    it("Ask for next quiz round", async() => {
        const res = await chai.request(api).post("/api/v1/round/next").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("question");
        expect(res.body).to.have.property("answers");
        expect(res.body.answers).to.be.an("array");
        expect(res.body.answers.length).to.be.equal(4);
        expect(res.body.round_type).to.be.equal("quiz");
        round = res.body;
    });
    it("Get current round", async() => {
        const res = await chai.request(api).get("/api/v1/round/current").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("question");
        expect(res.body).to.have.property("answers");
        expect(res.body.answers).to.be.an("array");
        expect(res.body.answers.length).to.be.equal(4);
        expect(res.body.round_type).to.be.equal("quiz");
        expect(res.body.round_id).to.be.equal(round.round_id);
    });
    it("Try answers for quiz", async() => {
        for(let i = 0; i < 4; i++){
            const currentAnswer = round.answers[i];
            const res = await chai.request(api).post("/api/v1/round/answer/quiz/" + round.round_id).set("Authorization", "Bearer " + user.token).send({answer: currentAnswer});
            if(res.body.is_correct === true){
                expect(res).to.have.status(StatusCodes.OK);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("is_correct");
                expect(res.body.is_correct).to.be.equal(true);
                const gameRes = await chai.request(api).get("/api/v1/game").set("Authorization", "Bearer " + user.token);
                expect(gameRes).to.have.status(StatusCodes.OK);
                const computedScore = gameRes.body.game.score;
                expect(i).to.be.equal(computedScore);
                break;
            }else{
                expect(res).to.have.status(StatusCodes.OK);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("is_correct");
                expect(res.body.is_correct).to.be.equal(false);
                expect(res.body).to.have.property("remaining_tries");
                expect(res.body.remaining_tries).to.be.equal(3 - i - 1);
            }
        }
    });
    it("Get current round which is finished", async() => {
        const res = await chai.request(api).get("/api/v1/round/current").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        console.log(res.body);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("question");
        expect(res.body).to.have.property("answers");
        expect(res.body.answers).to.be.an("array");
        expect(res.body.answers.length).to.be.equal(4);
        expect(res.body).to.have.property("is_finished");
        expect(res.body.is_finished).to.be.equal(true);
        expect(res.body.round_type).to.be.equal("quiz");
        expect(res.body.round_id).to.be.equal(round.round_id);
    });
    it("Ask for next right price round", async() => {
        const res = await chai.request(api).post("/api/v1/round/next").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("image");
        expect(res.body).to.have.property("question");
        expect(res.body).to.have.property("order_of_magnitude");
        expect(res.body.round_type).to.be.equal("right_price");
    });
    it("Try answers for right price", async() => {
        const res = await chai.request(api).post("/api/v1/round/answer/right_price/" + round.round_id).set("Authorization", "Bearer " + user.token).send({answer: 0});
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("is_correct");
        expect(res.body.is_correct).to.be.equal(false);
        expect(res.body).to.have.property("is_lower");
        expect(res.body.is_lower).to.be.equal(true);
        expect(res.body).to.have.property("remaining_tries");
        expect(res.body.remaining_tries).to.be.equal(2);
        const res2 = await chai.request(api).post("/api/v1/round/answer/right_price/" + round.round_id).set("Authorization", "Bearer " + user.token).send({answer: 999_999_999_999});
        expect(res2).to.have.status(StatusCodes.OK);
        expect(res2.body).to.be.an("object");
        expect(res2.body).to.have.property("is_correct");
        expect(res2.body.is_correct).to.be.equal(false);
        expect(res2.body).to.have.property("is_lower");
        expect(res2.body.is_lower).to.be.equal(false);
        expect(res2.body).to.have.property("remaining_tries");
        expect(res2.body.remaining_tries).to.be.equal(1);
    });
    it("Get current round", async() => {
        const res = await chai.request(api).get("/api/v1/round/current").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("image");
        expect(res.body).to.have.property("question");
        expect(res.body).to.have.property("order_of_magnitude");
        expect(res.body.round_type).to.be.equal("right_price");
    });
    it("Ask for next info round", async() => {
        const res = await chai.request(api).post("/api/v1/round/next").set("Authorization", "Bearer " + user.token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("round_type");
        expect(res.body).to.have.property("round_id");
        expect(res.body).to.have.property("type");
        expect(res.body).to.have.property("url");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("content");
        expect(res.body.round_type).to.be.equal("info");
        round = res.body;
    });
});
