import { Module } from '@nestjs/common';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ConfigModule.forRoot(), TwitchBotModule, ChatModule, PrismaModule, StoreModule],
})
export class AppModule {}
