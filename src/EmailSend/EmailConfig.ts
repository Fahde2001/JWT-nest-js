import * as nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' as the service
  auth: {
    user: process.env.EMAIL_USER || 'fahde.othmane.it23@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'bcav gbul usco ienn', // Use the generated App Password
  },
});

export class emailconfig {
  static generateVerificationToken(): { token: string; expirationDate: Date } {
    const tokenLength = 6;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationToken: string = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationToken += characters.charAt(randomIndex);
    }
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    return { token: verificationToken, expirationDate };
  }
  static async sendVerificationEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'fahde.othmane.it23l@gmail.com',
      to: email,
      subject: 'Account Verification',
      text: `Your verification token is: ${verificationToken}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Verification email sent to ${email}. Message ID: ${info.messageId}`,
      );
    } catch (error) {
      console.error(`Error sending verification email to ${email}:`, error);
      throw new Error('Failed to send verification email.');
    }
  }
}
