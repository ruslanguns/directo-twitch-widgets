import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitchBotService } from './twitch-bot.service';

@Module({
  imports: [ConfigModule],
  providers: [TwitchBotService],
})
export class TwitchBotModule {}
