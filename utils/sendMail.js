const sgMail = require("@sendgrid/mail");
const CONFIG = require("./config");

sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);

const sendMail = async (to, subject, text, html) => {
    const msg = {
        to,
        from: {
            name: CONFIG.FROM_NAME,
            email: CONFIG.FROM_EMAIL,
        }, // Change to your verified sender
        subject,
        text,
        html,
    };

    await sgMail.send(msg);

    return true;
};

module.exports = sendMail;
