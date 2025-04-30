// mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailSenderService {
    constructor(private configService: ConfigService) { }

    async sendMail(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });

        const info = await transporter.sendMail({
            from: `"Your App" <${this.configService.get('EMAIL_USER')}>`,
            to,
            subject,
            text,
        });

        console.log('Email sent: ' + info.response);
    }

    async sendTaskUpdatedEmail(to: string) {
        const subject = '✅ Your Task Has Been Successfully Updated: Completed';
        const text = `Hello,

        We are writing to inform you that your task has been successfully updated.

        📝 Task Status: Completed  
        📅 Updated At: ${new Date().toLocaleString()}

        If you have any questions or need further assistance, feel free to reach out.

        Best regards,  
        Task Collaboration System`;

        await this.sendMail(to, subject, text);
    }
}
