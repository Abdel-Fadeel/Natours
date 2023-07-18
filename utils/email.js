const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = `Abdel-Fadeel Hamdy <${process.env.EMAIL_FROM}>`;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
  }

  newTransporter() {
    if (process.env.NODE_ENV === 'prodction') {
      return 1;
    }
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 25,
      auth: {
        user: '6aa8ae311313e6',
        pass: '8ed7ef12b50fa3',
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    return console.log(html);

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.convert(html),
      html,
    };

    // 3) Create a transport and send email
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 min)'
    );
  }
};
