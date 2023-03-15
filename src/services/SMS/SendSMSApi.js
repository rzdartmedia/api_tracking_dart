const axios = require('axios');

async function SendSMSApi({ number, message }) {
    number = number.replace(/^0/, "62");
    const data = {
        uid: process.env.UID,
        pwd: process.env.PWD,
        messageId: "afeey32646",
        sc: process.env.SC,
        msisdn: number,
        smstype: 0,
        sms: message
    };

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.URLSMS,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const result = await axios(config);
    console.log(result.data);
}

module.exports = SendSMSApi;
