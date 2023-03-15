const axios = require('axios');
const FormData = require('form-data');
const { nanoid } = require('nanoid')

async function SendSMSApi({ number, message }) {
    number = number.replace(/^0/, "62");
    const messageId = nanoid(10);

    const data = new FormData();
    data.append('uid', process.env.UID);
    data.append('pwd', process.env.PASSWORD);
    data.append('messageId', messageId);
    data.append('sc', process.env.SC);
    data.append('msisdn', number);
    data.append('smstype', '1');
    data.append('sms', message);

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.URLSMS,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            ...data.getHeaders()
        }
    }

    const result = await axios(config);
    console.log(`UID ${process.env.UID}`)
    console.log(`PWD ${process.env.PASSWORD}`)
    console.log(`Send SMS to ${number}`)
    console.log(result.data);
}

module.exports = SendSMSApi;
