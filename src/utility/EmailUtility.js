import nodemailer from "nodemailer";
export async function SendEmail(EmailTo, EmailText, EmailSubject) {
  let Transport = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
  });

  let MailOption = {
    from: "nafisa11bd@yahoo.com",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await Transport.sendMail(MailOption);
}
