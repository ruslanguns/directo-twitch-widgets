import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from '../events/events.module';
import { ChatModule } from '../chat/chat.module';
import { TwitchBotService } from './twitch-bot.service';

@Module({
  imports: [ConfigModule, ChatModule, EventsModule],
  providers: [TwitchBotService],
})
export class TwitchBotModule {}
