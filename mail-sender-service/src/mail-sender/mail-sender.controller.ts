import { Controller } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailSenderController {
    constructor(private readonly mailService: MailSenderService) { }

    @EventPattern('send_email') // match với pattern bên producer
    async handleSendEmail(@Payload() data: any) {
        const { to } = data;
        await this.mailService.sendTaskUpdatedEmail(to);
        console.log(`Email sent to ${to}`);
    }
}