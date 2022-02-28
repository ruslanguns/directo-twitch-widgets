import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { StoreModule } from '../store/store.module';
import { TwitchApiModule } from '../twitch-api/twitch-api.module';

@Module({
  imports: [PrismaModule, StoreModule, TwitchApiModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
