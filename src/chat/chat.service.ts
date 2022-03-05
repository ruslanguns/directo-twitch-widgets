import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { PrismaService } from '../prisma/prisma.service';
import { Chat } from '../common/interfaces/chat.interface';
import { PaginateOptions } from '../common/interfaces/pagination.interface';
import { TwitchApiService } from '../twitch-api/twitch-api.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly data: PrismaService,
    private readonly store: StoreService,
    private readonly twitchApi: TwitchApiService,
  ) {}

  async getAllChats(options: PaginateOptions): Promise<Chat[]> {
    const { skip, take } = options;
    const chats = await this.data.chat.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return chats
      .map((chat) => ({
        ...chat,
        tags: JSON.parse(chat.tags),
        userInfo: JSON.parse(chat.userInfo),
      }))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChat(chat: Chat): Promise<Chat> {
    const userInfo = await this.twitchApi.getUserDetails(chat.tags['username']);
    const data = await this.data.chat.create({
      data: {
        ...chat,
        tags: JSON.stringify(chat.tags),
        userInfo: JSON.stringify(userInfo),
      },
    });
    return {
      ...data,
      tags: JSON.parse(data.tags),
      userInfo: JSON.parse(data.userInfo),
    };
  }

  async deleteOne(id: number) {
    return await this.data.chat.delete({ where: { id } });
  }

  async deleteAll() {
    return this.data.chat.deleteMany();
  }

  async getSelectedChat() {
    return {
      data: this.store.value.selectedChat,
    };
  }

  async setSelectedChat(chat: Chat) {
    return this.store.dispatch('selectedChat', chat);
  }
}
