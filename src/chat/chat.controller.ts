import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats(
    @Query('skip', new ParseIntPipe()) skip: number,
    @Query('take', new ParseIntPipe()) take: number,
  ) {
    return await this.chatService.getAllChats({ skip, take });
  }

  @Get('selected')
  getSelectedChat() {
    return this.chatService.getSelectedChat();
  }

  @Delete('all')
  async deleteAll() {
    return this.chatService.deleteAll();
  }

  @Delete(':chatId')
  async deleteOne(@Param('chatId') chatId: number) {
    return this.chatService.deleteOne(chatId);
  }
}
