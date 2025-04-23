import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép dùng ở mọi nơi mà không cần import lại
    }),
    MailSenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
