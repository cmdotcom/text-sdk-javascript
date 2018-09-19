import * as CM from "../typescript-node-client/api";

class MessageApiClient {

    private readonly productToken: string;

    constructor(productToken: string) {
        this.productToken = productToken;
    }

    public SendTextMessage(to: string, from: string, message: string) {
        return this.SendTextMessages([to], from, message);
    }

    public SendTextMessages(to: string[], from: string, message: string) {
        const api = new CM.MessagesApi();

        const messageEnvelope = new CM.MessageEnvelope();
        messageEnvelope.messages = new CM.Messages();
        messageEnvelope.messages.authentication = new CM.Authentication();
        messageEnvelope.messages.authentication.productToken = this.productToken;

        const msg = new CM.Message();
        msg.customGrouping = "text-sdk-javascript";
        msg.from = from;
        msg.body = new CM.MessageBody();
        msg.body.type = "AUTO";
        msg.body.content = message;

        msg.to = this.createRecipients(to);

        messageEnvelope.messages.msg = new Array<CM.Message>();
        messageEnvelope.messages.msg.push(msg);

        // Send the message
        let result = api.messagesSendMessage(messageEnvelope);

        // Return the promise.
        return result;
    }

    private createRecipients(recipients: string[]) {
        return recipients.map((number: string) => {
            const recipient: CM.Recipient = {
                number: number
            };
            return recipient;
        })
    }
}

export {MessageApiClient};