## @cmdotcom/text-sdk: A helper library to send text messages.

[![Published on NPM](https://img.shields.io/npm/v/@cmdotcom/text-sdk.svg)](https://www.npmjs.com/package/@cmdotcom/text-sdk)
[![Travis (.com)](https://img.shields.io/travis/com/cmdotcom/text-sdk-javascript.svg)](https://travis-ci.com/cmdotcom/text-sdk-javascript)
[![Codecov](https://img.shields.io/codecov/c/github/cmdotcom/text-sdk-javascript.svg)](https://codecov.io/gh/cmdotcom/text-sdk-javascript)
[![Codacy grade](https://img.shields.io/codacy/grade/576913f8bbde429cb9cd15998f6ee070.svg)](https://app.codacy.com/project/CMTelecom/text-sdk-javascript/dashboard)



Want to send text-messages in your Node.js application? Then you are at the right place.

The package is currently limited in features compared to the CM gateway, but if you want to get all the functionalities, go to: [CM.com API Docs](https://docs.cmtelecom.com/bulk-sms/v1.0)

### Usage
#### Node.JS
First, run `npm install @cmdotcom/text-sdk`. Then, in your source file:
```javascript
const messagingApi = require("@cmdotcom/text-sdk");
const {CMTypes} = require("@cmdotcom/text-sdk");

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

  or send rich messages
```javascript
const result = myMessageApi.sendRichMessage(["00316012345678"], "TestSender", "Hello world?!", null, ["Viber"],
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
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
```

 send rich messages using the message builder
```javascript
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
```

### License
@cmdotcom/text-sdk is under the MIT license. See LICENSE file.
