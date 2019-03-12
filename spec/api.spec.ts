import { MessageApiClient, CMTypes } from "../lib/MessageApiClient";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

import "mocha";

// Mocking the gateway here.
const nock = require('nock');
const gateway = nock('https://gw.cmtelecom.com')
    .persist()
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
        const response = myMessageApi.sendTextMessage(["00316012345678"], "MockedTest", "Hi.");

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request, when sending an array of recipients", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.sendTextMessage(["00316012345678"], "MockedTest", "Hello.");

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request, when sending rich content", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);
        const response = client.sendRichMessage(["00316012345678"], "TestSender", "Hello world?!", null, ["Viber"],
            [
                {
                    media: {
                        mediaName: "cm.com",
                        mediaUri: "https://avatars3.githubusercontent.com/u/8234794?s=200&v=4"
                    },
                    text: "Check out my image"
                }
            ],
            [
                {
                    action: "openUrl",
                    label: "Click me",
                    url: "google.com"
                }
            ])

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request, when using the message-builder", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const richMessage : CMTypes.RichMessage = {
            media: {
                mediaName: "cm.com",
                mediaUri: "https://avatars3.githubusercontent.com/u/8234794?s=200&v=4"
            },
            text: "Check out my image"
        };

        const suggestion : CMTypes.Suggestion = {
            action: "openUrl",
            label: "Click me",
            url: "google.com"
        };

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["Viber"])
            .setConversation([richMessage])
            .setSuggestion([suggestion])
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });
});