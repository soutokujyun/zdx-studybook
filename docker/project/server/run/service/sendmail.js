const nodemailer = require("nodemailer");

const ADMAIN_MAIL = "zeng_dexun@ymsl.com.cn";

const transporter = nodemailer.createTransport({
  host: "10.191.0.108",
  port: 25,
  secure: false, // use TLS
});

async function sendmail({ email, subject, text, html }) {
    
    const mailOptions = {
        from: ADMAIN_MAIL,
        cc: ADMAIN_MAIL,
        to: email,
        subject,
        text,
        html
      };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = sendmail;
