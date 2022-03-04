import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { Chat } from '../common/interfaces/chat.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('selected-chat')
  handleSelectedChat(@MessageBody() chat: Chat) {
    this.chatService.setSelectedChat(chat);
    this.server.emit('selected-chat', chat);
  }

  sendConfetti() {
    this.server.emit('confetti');
  }

  @SubscribeMessage('new-question')
  newQuestion(@MessageBody() chat: Chat) {
    this.server.emit('new-question', chat);
    console.log('chat', chat);
  }
}
