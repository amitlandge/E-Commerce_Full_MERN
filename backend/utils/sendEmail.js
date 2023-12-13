const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "amitlandge2000@gmail.com",
      pass: "cpmhjbovvjwqtlht",
    },
  });
  const mailOptions = {
    from: "amitlandge2000@gmail.com",
    to: options.user,
    subject: options.subject,
    text: options.message,
  };
  await transpoter.sendMail(mailOptions);
};
module.exports = sendEmail;
