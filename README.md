## @cmdotcom/text-sdk: A helper library to send text messages.

[![Published on NPM](https://img.shields.io/npm/v/@cmdotcom/text-sdk.svg)](https://www.npmjs.com/package/@cmdotcom/text-sdk)
![Node.js CI](https://github.com/cmdotcom/text-sdk-javascript/workflows/Node.js%20CI/badge.svg)
[![Codecov](https://img.shields.io/codecov/c/github/cmdotcom/text-sdk-javascript.svg)](https://codecov.io/gh/cmdotcom/text-sdk-javascript)


Want to send text-messages in your Node.js application? Then you are at the right place.

The package is currently limited in features compared to the CM gateway, but if you want to get all the functionalities, go to: [CM.com API Docs](https://developers.cm.com/messaging/docs)

### Usage
#### Node.JS
First, run `npm install @cmdotcom/text-sdk`. Then, in your source file:
```javascript
const messagingApi = require("@cmdotcom/text-sdk");

// Get your product token at CM.com.
const yourProductToken = "";
const myMessageApi = new messagingApi.MessageApiClient(yourProductToken);

const result = myMessageApi.sendTextMessage(["00316012345678"], "TestSender", "Hello world?!");

result.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

or send multiple
```javascript
const result = myMessageApi.sendTextMessage(["00316012345678","003160000000"], "TestSender", "Hello world?!");
```

send rich messages using the message builder
```javascript
const richMessage = {
    media: {
        mediaName: "cm.com",
        mediaUri: "https://avatars3.githubusercontent.com/u/8234794?s=200&v=4"
    },
    text: "Our logo!"
};

const suggestion = {
    action: "openUrl",
    label: "Click me",
    url: "https://www.cm.com"
};

const response = client.createMessage()
    .setMessage(["00316012345678"], "TestSender", "Hello world?!")
    .setAllowedChannels(["Viber"])
    .setConversation([richMessage])
    .setSuggestion([suggestion])
    .send();

response.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

or send whatsapp template messages using the message builder
```javascript
const template = {
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

const response = client.createMessage()
    .setMessage(["00316012345678"], "TestSender", "Hello world?!")
    .setAllowedChannels(["WhatsApp"])
    .setTemplate(template)
    .send();

response.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

### License
@cmdotcom/text-sdk is under the MIT license. See LICENSE file.
