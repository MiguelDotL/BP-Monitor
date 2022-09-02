if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const sendSMS = (message) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const accountToken = process.env.TWILIO_ACCOUNT_TOKEN;
    const fromNum = process.env.TWILIO_PHONE_NUM;
    const toNum = process.env.TO_PHONE_NUM;
    const body = "This Is a Test Message Breuuhhh.";
    const client = require("twilio")(accountSid, accountToken);

    client.messages
        .create({ body: message, from: fromNum, to: toNum })
        .then((msgObj) => console.log(msgObj));
};

// sendSMS();

// ---- RESPONSE BODY ---- //
// {
//     body: 'Sent from your Twilio trial account - This Is a Test Message Breuuhhh.',
//     numSegments: '1',
//     direction: 'outbound-api',
//     from: '+18084442884',
//     to: '+19546703699',
//     dateUpdated: 2022-08-21T22:53:41.000Z,
//     price: null,
//     errorMessage: null,
//     uri: '/2010-04-01/Accounts/AC41230e87a200ec1110c1628b1b265a56/Messages/SMfe2ad2495c935e58b7cd7b20d2231f11.json',
//     accountSid: 'AC41230e87a200ec1110c1628b1b265a56',
//     numMedia: '0',
//     status: 'queued',
//     messagingServiceSid: null,
//     sid: 'SMfe2ad2495c935e58b7cd7b20d2231f11',
//     dateSent: null,
//     dateCreated: 2022-08-21T22:53:41.000Z,
//     errorCode: null,
//     priceUnit: 'USD',
//     apiVersion: '2010-04-01',
//     subresourceUris: {
//       media: '/2010-04-01/Accounts/AC41230e87a200ec1110c1628b1b265a56/Messages/SMfe2ad2495c935e58b7cd7b20d2231f11/Media.json'
//     }
//   }

module.export = sendSMS;
