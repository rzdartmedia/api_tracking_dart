const axios = require('axios');

async function SendNotificationFcm({ title, message, fcmToken }) {
    const data = JSON.stringify({
        "to": fcmToken,
        "data": {
            "title": title,
            "body": message,
        }
    });

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.URLFCM,
        headers: {
            'Authorization': process.env.TOKENAUTHORIZATIONFCM,
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const result = await axios(config);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    SendNotificationFcm,
}
