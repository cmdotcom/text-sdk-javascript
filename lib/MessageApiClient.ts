import * as CMTypes from "../typescript-node-client/api";
import http = require('http');

export type Channel = "SMS" | "Viber" | "RCS" | "Apple Business Chat" | "WhatsApp" | "Twitter" | "MobilePush" | "Facebook Messenger" | "Google Business Messages" | "Instagram";
export type RichMessage = CMTypes.RichMessage;
export type Suggestion = CMTypes.Suggestion;
export type Template = CMTypes.Template;
export type MessagesResponse = CMTypes.MessagesResponse;

/**
 * Message client for the CM.com Platform
 */
export class MessageApiClient {

    private readonly productToken: string;
    private readonly basePath: string;

    /**
     * Create a new client instance with a provided authentication key
     * @param productToken Private autorization token for CM.com
     */
    constructor(productToken: string, basePath: string) {
        this.productToken = productToken;
		this.basePath = basePath;
    }

    /**
     * Create a new message builder
     */
    public createMessage() : Message {
        return new Message(this.productToken, this.basePath);
    }

    /**
     * @deprecated use .sendTextMessages(...) instead
     */
    public SendTextMessage(to: string, from: string, message: string, reference: string = undefined) {
        return this.SendTextMessages([to], from, message, reference);
    }

    /**
     * @deprecated use .sendTextMessages(...) instead
     */
    public SendTextMessages(to: string[], from: string, message: string, reference: string = undefined) {
        return this.sendTextMessage(to, from, message, reference);
    }

    /**
     * Send an SMS message
     * @param to array of recipients for the message, specify the numbers in international format with leading 00
     * For Twitter: use the Twitter Snowflake ID
     * @param from the sender of the message, specify valid Sender ID.
     * For Twitter: use the Twitter Snowflake ID of the account you want to use as sender.
     * @param message the body of the SMS message to be sent
     * @param reference (optional) reference to the message to query it later in the CM.platform.
     */public sendTextMessage(to: string[], from: string, message: string, reference: string = undefined) {
        return this
            .createMessage()
            .setMessage(to, from, message, reference)
            .send();
    }
}

/**
 * Message object to send via the CM.com platform
 */
export class Message extends CMTypes.MessageEnvelope {

    private api: CMTypes.MessagesApi;

    /**
     * @deprecated Please use the MessageApiClient.createMessage instead.
     */
    constructor(productToken: string, basePath: string) {
        super();

        this.api = new CMTypes.MessagesApi(basePath);
        this.messages = new CMTypes.Messages();
        this.messages.authentication = new CMTypes.Authentication();
        this.messages.authentication.productToken = productToken;
    }

    /**
     * Sets the essential message parameters.
     * @param to array of recipients for the message, specify the numbers in international format with leading 00.
     * For Twitter: use the Twitter Snowflake ID
     * @param from the sender of the message, specify valid Sender ID.
     * For Twitter: use the Twitter Snowflake ID of the account you want to use as sender.
     * @param message the body of the SMS message to be sent
     * @param reference (optional) reference to the message to query it later in the CM.platform.
     */
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

    /**
     * Sets the allowed channels to use. Default is to allow any channel configured for your account
     * @param channels array of allowed channels.
     * Any of "SMS", "Viber", "RCS", "Apple Business Chat", "WhatsApp" and "Twitter"
     */
    public setAllowedChannels(channels: Channel[]): Message {
        this.messages.msg[0].allowedChannels = channels || [];
        return this;
    }

    /**
     * Sets the rich message conversation
     * @param conversation array of rich message conversation objects
     */
    public setConversation(conversation: RichMessage[]): Message {
        this.getRichContent().conversation = conversation;
        return this;
    }

     /**
     * Sets the rich message suggestions
     * @param conversation array of rich message suggestion objects
     */
    public setSuggestion(suggestions: Suggestion[]): Message {
        this.getRichContent().suggestions = suggestions;
        return this;
    }

    /**
     * Sets the rich message template
     * @param template template definition and usage object
     */
    public setTemplate(template: Template): Message {
        this.getRichContent().conversation = [{ template: template }];
        return this;
    }

    /**
     * Sends the message to the CM.com Platform
     */
    public send(): Promise<{ body: MessagesResponse; response: http.IncomingMessage }> {
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

    private getRichContent(): CMTypes.RichContent {
        if (!this.messages.msg[0].richContent) {
            this.messages.msg[0].richContent = new CMTypes.RichContent();
        }
        return this.messages.msg[0].richContent;
    }
}

// exported for backwards compatibility
export { CMTypes };
