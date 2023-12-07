const {StatusCodes} = require("http-status-codes");
const testConfig = require("./config");
const {api, expect, chai} = testConfig;

const testUser = {
    username: "Test",
    password: "Test"
};

// const res = await chai.request(api).get("/api/v1/user/1").set("Authorization", "Bearer " + testToken);
let token;
describe("User tests", async() => {
    it("User creation", async() => {
        const res = await chai.request(api).post("/api/v1/user").send(testUser);
        expect(res).to.have.status(StatusCodes.CREATED);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
    });
    it("Check login without token", async() => {
        const res = await chai.request(api).get("/api/v1/login");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("Check login with invalid token", async() => {
        const res = await chai.request(api).get("/api/v1/login").set("Authorization", "Bearer " + "invalid");
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
    });
    it("User login with no body", async() => {
        const res = await chai.request(api).post("/api/v1/login");
        expect(res).to.have.status(StatusCodes.BAD_REQUEST);
        token = res.body.token;
    });
    it("User login with no existing username", async() => {
        const res = await chai.request(api).post("/api/v1/login").send({username: "invalid", password: "invalid"});
        expect(res).to.have.status(StatusCodes.NOT_FOUND);
        token = res.body.token;
    });
    it("User login with wrong password", async() => {
        const res = await chai.request(api).post("/api/v1/login").send({username: "Test", password: "invalid"});
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
        token = res.body.token;
    });
    it("User login", async() => {
        const res = await chai.request(api).post("/api/v1/login").send(testUser);
        expect(res).to.have.status(StatusCodes.ACCEPTED);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("token");
        token = res.body.token;
    });
    it("Check login", async() => {
        const res = await chai.request(api).get("/api/v1/login").set("Authorization", "Bearer " + token);
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
    });
});
