import { Injectable } from '@nestjs/common';
import { SendMailCommand } from './mail-created.command';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailHandler {
  constructor() {}

  async handle(command: SendMailCommand) {
    const { email, access_token } = command;
console.log('✌️command --->', command);

console.log('✌️access_token --->', access_token);

    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'ankitkumarguptademo@gmail.com',
          pass: 'okyc sjau tqdo tsls',
        },
      });
      const html = `
        <div>
          <h1>Your access token</h1>
          <p>Your access token: <strong>${access_token}</strong></p>
        </div>
      `;

      var mailOptions = {
        from: 'ankitkumarguptademo@gmail.com',
        to: email,
        subject: 'Ticket are confirm',
        html: html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
        } else {
          console.log('Email sent: ', info.response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
