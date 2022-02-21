import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [ChatModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
