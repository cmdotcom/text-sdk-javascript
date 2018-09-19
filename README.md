## @cmdotcom/text-sdk: A helper library to send text messages.

[![Build Status](https://travis-ci.org/CMTelecom/cm-messaging-node.svg?branch=master)](https://travis-ci.org/CMTelecom/cm-messaging-node)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d51474d6130b4db08ae8a8c57dace8ea)](https://www.codacy.com/app/CMTelecom/cm-messaging-node?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CMTelecom/cm-messaging-node&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/CMTelecom/cm-messaging-node/branch/master/graph/badge.svg)](https://codecov.io/gh/CMTelecom/cm-messaging-node)

Want to send text-messages in your Node.js application? Then you are at the right place.

The package is currently limited in features compared to the CM gateway, but if you want to get all the functionalities, go to: [CM.com API Docs](https://docs.cmtelecom.com/bulk-sms/v1.0)

### Usage
#### Node.JS
First, run `npm install @cmdotcom/text-sdk`. Then, in your source file:
```javascript
const messagingApi = require("@cmdotcom/text-sdk");

// Get your product token at CM.com.
const yourProductToken = "";
const myMessageApi = new messagingApi.MessageApiClient(yourProductToken);

const result = myMessageApi.SendTextMessage("00316012345678", "TestSender", "Hello world?!");

result.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

or send multiple with SendTextMessages:
```javascript
const result = myMessageApi.SendTextMessages(["00316012345678","003160000000"], "TestSender", "Hello world?!");
```

### License
@cmdotcom/text-sdk is under the MIT license. See LICENSE file.
