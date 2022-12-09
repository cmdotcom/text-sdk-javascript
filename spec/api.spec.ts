import { MessageApiClient, RichMessage, Template, Suggestion } from "../lib/MessageApiClient";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

import "mocha";

const nock = require('nock');
// Mocking the gateway here.
beforeEach(() => {
    nock('https://gw.cmtelecom.com')
        .post('/v1.0/message')
        .once() //Make sure we don't post twice
        .reply(200, (uri, requestBody) => {
            // For debugging purposes:
            //console.log(uri);
            //console.log(requestBody.messages.msg);

            return { details: "Created 1 message(s)" };
        });
});


describe("MessageApiClient", () => {

    it("should be able to initiate the api", () => {
        const yourProductToken = "aaaa";
        const myMessageApi = new MessageApiClient(yourProductToken);
        expect(myMessageApi).to.be.an.instanceof(MessageApiClient);
    });

    it("should create a valid http(s) request - SendTextMessage", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.SendTextMessage("00316012345678", "MockedTest", "Hi.");

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request - SendTextMessages", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.SendTextMessages(["00316012345678"], "MockedTest", "Hi.");

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    it("should create a valid http(s) request - sendTextMessage", () => {
        const yourProductToken = "cccc";
        const myMessageApi = new MessageApiClient(yourProductToken);
        const response = myMessageApi.sendTextMessage(["00316012345678"], "MockedTest", "Hi.");

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });
});

describe("MessageApiClient+MessageBuilder", () => {
    const richMessage: RichMessage = {
        media: {
            mediaName: "cm.com",
            mediaUri: "https://avatars3.githubusercontent.com/u/8234794?s=200&v=4"
        },
        text: "Check out my image"
    };

    it("should create a valid http(s) request, when using the message-builder with richMessage", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["Viber"])
            .setConversation([richMessage])
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    const suggestion: Suggestion = {
        action: "openUrl",
        label: "Click me",
        url: "google.com"
    };

    it("should create a valid http(s) request, when using the message-builder with suggestion", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["Viber"])
            .setSuggestion([suggestion])
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    const whatsappTemplate: Template = {
        whatsapp: {
            elementName: 'template-name',
            language: {
                code: 'en',
                policy: 'deterministic'
            },
            namespace: 'the-namespace-of-template',
            localizableParams: [
                {
                    _default: "firstname"
                }
            ]
        }
    };

    it("should create a valid http(s) request, when using the message-builder with template", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["WhatsApp"])
            .setTemplate(whatsappTemplate)
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    const richWhatsappTemplate: Template = {
        whatsapp: {
            elementName: 'template-name',
            language: {
                code: 'en',
                policy: 'deterministic'
            },
            namespace: 'the-namespace-of-template',
            components: [{
                type: 'body',
                parameters: [{
                    type: 'text',
                    text: 'firstname'
                }]
            }]
        }
    };

    it("should create a valid http(s) request, when using the message-builder with a rich template", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["WhatsApp"])
            .setTemplate(richWhatsappTemplate)
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });

    const whatsAppInteractiveContent = {
        type: 'list',
        header: {
            type: "text",
            text: "your-header-content"
        },
        body: {
            text: "your-text-message-content"
        },
        footer: {
            text: "your-footer-content"
        },
        action: {
            button: "cta-button-content",
            sections: [{
                title: "your-section-title1",
                rows: [{
                    id: "unique-row-identifier1",
                    title: "row-title-content",
                    description: "row-description-content"
                }]
            },
            {
                title: "your-section-title2",
                rows: [{
                    id: "unique-row-identifier2",
                    title: "row-title-content",
                    description: "row-description-content"
                }]
            }
            ]
        }
    };

    it("should create a valid http(s) request, when using the message-builder with a interactive WhatsApp message", () => {
        const yourProductToken = "dddd";
        const client = new MessageApiClient(yourProductToken);

        const response = client.createMessage()
            .setMessage(["00316012345678"], "TestSender", "Hello world?!")
            .setAllowedChannels(["WhatsApp"])
            .setInteractive(whatsAppInteractiveContent)
            .send();

        expect(response).to.be.eventually.fulfilled.and.to.satisfy((response) => {
            return response.body.details === "Created 1 message(s)";
        });
    });
});