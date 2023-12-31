
const nodemailer = require("nodemailer");


//SENDING EMAILS
module.exports = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: `sandbox.smtp.mailtrap.io`,
      service: `Gmail`,
      port: process.env.PORT_NODEMAILER,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.MAIL_PASS,
      },
      mail: {
        // This property is new.
        smtp: {
          // This property is new.
          ssl: {
            // This property is new.
            version: "TLSv1.2",
          },
        },
      },
    });

    await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email send successfully");
  } catch (error) {
   
    console.log("email not send");
    res.json({message:"Something went wrong.Try again."})
    console.log(error);
  }
};