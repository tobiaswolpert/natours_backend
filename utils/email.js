const nodemailer = require("nodemailer");
// const { getMaxListeners } = require("../app");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //Activate in gamil 'less secure app' option
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Tobias W <tw@getMaxListeners.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
