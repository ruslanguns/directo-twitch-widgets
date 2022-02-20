import { Module } from '@nestjs/common';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TwitchBotModule],
})
export class AppModule {}
