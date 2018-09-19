import { MessageApiClient } from "../lib/MessageApiClient";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

import "mocha";

// Mocking the gateway here.
const nock = require('nock');
const gateway = nock('https://gw.cmtelecom.com')
    .post('/v1.0/message')
    .reply(200, {
        "details": "Created 1 message(s)"
    });

describe("MessageApiClient", () => {

    it("should be able to initiate the api", () => {
        const yourProductToken = "aaaa";
        const myMessageApi = new MessageApiClient(yourProductToken);
        expect(myMessageApi).to.be.an.instanceof(MessageApiClient);
    });

    it("should create a valid http(s) request", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.SendTextMessage("00316012345678", "MockedTest", "Hi.");

        expect(response).eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request, when sending an array of recipients", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.SendTextMessages(["00316012345678"], "MockedTest", "Hi.");

        expect(response).eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });
});