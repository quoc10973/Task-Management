import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailSenderController } from './mail-sender.controller';

@Module({
  providers: [MailSenderService],
  controllers: [MailSenderController]
})
export class MailSenderModule { }
