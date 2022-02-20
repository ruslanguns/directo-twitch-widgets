import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from '../chat/chat.module';
import { TwitchBotService } from './twitch-bot.service';

@Module({
  imports: [ConfigModule, ChatModule],
  providers: [TwitchBotService],
})
export class TwitchBotModule {}
