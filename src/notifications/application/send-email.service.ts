import nodemailer from 'nodemailer';
import { injectable } from 'tsyringe';

@injectable()
export class SendEmailService {
  #transporter = nodemailer.createTransport({
    host: 'smtp.freesmtpservers.com',
    port: 25,
    secure: false,
    auth: undefined,
  });

  async execute(to: string, subject: string, text: string): Promise<void> {
    try {
      const info = await this.#transporter.sendMail({
        from: 'library@example.com',
        to,
        subject,
        text,
      });

      console.log('Email sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
