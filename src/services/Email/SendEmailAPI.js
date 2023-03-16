const axios = require('axios');
const FormData = require('form-data');

async function SendEmailAPI({ email, subject, message }) {
    const data = new FormData();
    data.append('userid', process.env.USERIDEMAIL);
    data.append('password', process.env.PASSWORDEMAIL);
    data.append('dest', email);
    data.append('subject', subject);
    data.append('message', message);

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.URLEMAIL,
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(`Berhasil send email ke ${email}`)
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(`Gagal send email ke ${email}`)
            console.log(error);
        });
};

module.exports = SendEmailAPI;