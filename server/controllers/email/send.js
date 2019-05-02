const nodemailer = require("nodemailer");
const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } = require("../../config");

const credentials = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD
  }
};

const transporter = nodemailer.createTransport(credentials);

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (to, content) => {
  const contacts = {
    from: `"Fred Foo 👻" ${MAIL_USERNAME} <noreply@example.com>`,
    to
  };

  const mailOptions = Object.assign({}, content, contacts);

  // This file is imported into the controller as 'sendEmail'. Because
  // 'transporter.sendMail()' below returns a promise we can write code like this
  // in the contoller when we are using the sendEmail() function.
  //
  //  sendEmail()
  //   .then(() => doSomethingElse())
  //
  // If you are running into errors getting Nodemailer working, wrap the following
  // line in a try/catch. Most likely is not loading the credentials properly in
  // the .env file or failing to allow unsafe apps in your gmail settings.
  await transporter.sendMail(mailOptions);
};
