import { Controller } from '@nestjs/common';
import { MailService } from './mail-sender.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @EventPattern('send_email') // match với pattern bên producer
    async handleSendEmail(@Payload() data: any) {
        const { to } = data;
        await this.mailService.sendTaskUpdatedEmail(to);
        console.log(`Email sent to ${to}`);
    }
}