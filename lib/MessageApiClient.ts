import * as CM from "../typescript-node-client/api";

class MessageApiClient {

    private readonly productToken: string;

    constructor(productToken: string) {
        this.productToken = productToken;
    }

    public createMessage() {
        return new Message(this.productToken);
    }

    public sendTextMessage(to: string[], from: string, message: string, reference: string = undefined) {
        return this
            .createMessage()
            .setMessage(to, from, message, reference)
            .send();
    }

    public sendRichMessage(to: string[], from: string, message: string, reference: string = undefined, channels: string[] = undefined, conversation: any = undefined, suggestions: any = undefined) {
        return this
            .createMessage()
            .setMessage(to, from, message, reference)
            .setAllowedChannels(channels)
            .setConversation(conversation)
            .setSuggestion(suggestions)
            .send();
    }
}

class Message extends CM.MessageEnvelope {

    private RichContent: any;

    constructor(productToken: string) {
        super();

        this.messages = new CM.Messages();
        this.messages.authentication = new CM.Authentication();
        this.messages.authentication.productToken = productToken;
        this.RichContent = new CM.RichContent();
    }

    public setMessage(to: string[], from: string, message: string, reference: string = undefined) {
        const msg = new CM.Message();
        msg.customGrouping = "text-sdk-javascript";
        msg.from = from;
        msg.body = new CM.MessageBody();
        msg.body.type = "AUTO";
        msg.body.content = message;

        msg.reference = reference;
        msg.to = this.createRecipients(to);

        this.messages.msg = new Array<CM.Message>();
        this.messages.msg.push(msg);

        return this;
    }

    public setAllowedChannels(channels: string[]) {
        if (channels && channels.length > 0) {
            this.messages.msg[0].body.allowedChannels = channels;
        }
        return this;
    }

    public setConversation(conversation: CM.RichMessage[]) {
        this.RichContent.conversation = conversation;
        this.messages.msg[0].body.richContent = this.RichContent;
        return this;
    }

    public setSuggestion(suggestions: CM.Suggestion[]) {
        this.RichContent.suggestions = suggestions;
        this.messages.msg[0].body.richContent = this.RichContent;
        return this;
    }

    public send() {
        const api = new CM.MessagesApi();

        return api.messagesSendMessage(this);
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

export { MessageApiClient, Message, CM };