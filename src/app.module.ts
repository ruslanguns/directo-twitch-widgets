import { Module } from '@nestjs/common';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { EventsModule } from './events/events.module';
import { TwitchApiModule } from './twitch-api/twitch-api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),
    TwitchBotModule,
    ChatModule,
    PrismaModule,
    StoreModule,
    EventsModule,
    TwitchApiModule,
  ],
})
export class AppModule {}
