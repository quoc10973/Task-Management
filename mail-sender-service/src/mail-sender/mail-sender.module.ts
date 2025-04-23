import { Module } from '@nestjs/common';
import { MailService } from './mail-sender.service';
import { MailController } from './mail-sender.controller';

@Module({
  providers: [MailService],
  controllers: [MailController]
})
export class MailSenderModule { }
