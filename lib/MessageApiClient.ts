import * as CMTypes from "../typescript-node-client/api";

class MessageApiClient {

    private readonly productToken: string;

    constructor(productToken: string) {
        this.productToken = productToken;
    }

    public createMessage() : Message {
        return new Message(this.productToken);
    }

    public SendTextMessage(to: string, from: string, message: string, reference: string = undefined) {
        return this.SendTextMessages([to], from, message, reference);
    }
    
    public SendTextMessages(to: string[], from: string, message: string, reference: string = undefined) {
        return this.sendTextMessage(to, from, message, reference);
    }
    
    public sendTextMessage(to: string[], from: string, message: string, reference: string = undefined) {
        return this
            .createMessage()
            .setMessage(to, from, message, reference)
            .send();
    }
}

class Message extends CMTypes.MessageEnvelope {

    private api: CMTypes.MessagesApi;

    constructor(productToken: string) {
        super();

        this.api = new CMTypes.MessagesApi();
        this.messages = new CMTypes.Messages();
        this.messages.authentication = new CMTypes.Authentication();
        this.messages.authentication.productToken = productToken;
    }

    public setMessage(to: string[], from: string, message: string, reference: string = undefined): Message {
        const msg = new CMTypes.Message();
        msg.customGrouping = "text-sdk-javascript";
        msg.from = from;
        msg.body = new CMTypes.MessageBody();
        msg.body.type = "AUTO";
        msg.body.content = message;

        msg.reference = reference;
        msg.to = this.createRecipients(to);

        this.messages.msg = new Array<CMTypes.Message>();
        this.messages.msg.push(msg);

        return this;
    }

    public setAllowedChannels(channels: string[]): Message {
        if (channels && channels.length > 0) {
            this.messages.msg[0].allowedChannels = channels;
        }
        return this;
    }

    public setConversation(conversation: CMTypes.RichMessage[]): Message {
        if (this.messages.msg[0].richContent === undefined) {
            this.messages.msg[0].richContent = new CMTypes.RichContent();
        }
        this.messages.msg[0].richContent.conversation = conversation;
        return this;
    }

    public setSuggestion(suggestions: CMTypes.Suggestion[]): Message {
        if (this.messages.msg[0].richContent === undefined) {
            this.messages.msg[0].richContent = new CMTypes.RichContent();
        }
        this.messages.msg[0].richContent.suggestions = suggestions;
        return this;
    }

    public setTemplate(template: CMTypes.Template): Message {
        if (this.messages.msg[0].richContent === undefined) {
            this.messages.msg[0].richContent = new CMTypes.RichContent();
        }
        this.messages.msg[0].richContent.conversation = [
            {
                template: template
            }
        ];
        return this;
    }

    public send(): Promise<{ body: CMTypes.MessagesResponse;  }> {
        return this.api.messagesSendMessage(this);
    }

    private createRecipients(recipients: string[]): CMTypes.Recipient[] {
        return recipients.map((number: string) => {
            const recipient: CMTypes.Recipient = {
                number: number
            };
            return recipient;
        })
    }
}

export { MessageApiClient, Message, CMTypes };