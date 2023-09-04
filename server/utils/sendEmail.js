import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// sending mails to  user emails
const RecoveryMail = async (user) => {
  const token = Jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    port: 465,
    host: process.env.SMTP_HOST,
  });
  const url = `http://localhost:4000/api/user/reset/${token}`;
  const MailOptions = {
    from: { name: "BigDeals", address: process.env.SMTP_USER },
    to: user.email,
    subject: "Password Recovery",
    html: `
    <p>You Have Requested To Reset Your Password.</p>
    <p><a href="${url}"> Click here</a>to reset.</p>
    <p>This Link Will Expire In 30 Min.</p>
    <p>Pls Ignore If You Haven't Requested.</p>
    `,
  };

  await transporter.sendMail(MailOptions);
};

const WelcomeMail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    port: 465,
    host: process.env.SMTP_HOST,
  });
  const MailOptions = {
    from: { name: "BigDeals", address: process.env.SMTP_USER },
    to: user.email,
    subject: "Welcome to BigDeals",
    html: `<p>Hi ${user.name} </p>
    <p>Tight On Budget or month ending?</p>
    <p>No worries, we've got you covered. Here on BigDeals, you will find amazing deals at the best prices. We offer price-slashed deals for every category.</p>
    <p>So why wait? Sign up for BigDeals now and subscribe to our newsletter to receive deals right in your Gmail inbox.</p>`,
  };

  await transporter.sendMail(MailOptions);
};

export { RecoveryMail, WelcomeMail };
