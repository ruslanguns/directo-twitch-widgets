import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type Chat = {
  tags: Record<string, any>;
  channel: string;
  message: string;
  userInfo?: Record<string, any>;
};

type PaginateProps = { skip?: number; take?: number };

@Injectable()
export class ChatService {
  constructor(private readonly data: PrismaService) {}

  async getAllChats(options: PaginateProps): Promise<Chat[]> {
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

  async createChat(chat: Chat) {
    const data = await this.data.chat.create({
      data: {
        ...chat,
        tags: JSON.stringify(chat.tags),
        userInfo: JSON.stringify(chat.userInfo),
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
}
