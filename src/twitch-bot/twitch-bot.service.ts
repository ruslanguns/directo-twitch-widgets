import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as tmi from 'tmi.js';
import { ChatService } from '../chat/chat.service';
import { SocialLink } from '../common/interfaces';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class TwitchBotService {
  private tmiClient: tmi.Client;
  private clientId = this.config.get<string>('TWITCH_API_CLIENT_ID');
  private tmiPassword = this.config.get<string>('TWITCH_TMI_PASSWORD');
  private channels = this.config.get<string>('TWITCH_CHANNEL');
  private socialLinks: SocialLink[] = [];

  constructor(
    private readonly config: ConfigService,
    private readonly chatService: ChatService,
    private readonly events: EventsGateway,
  ) {
    this.socialLinks = Object.keys(process.env)
      .filter((s) => s.startsWith('SOCIAL_LINK_'))
      .map((social) => {
        const name = social.split('SOCIAL_LINK_')[1].toLowerCase();
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          command: `!${name}`,
          url: process.env[social],
        };
      });

    this.setupClient({
      options: { debug: true },
      connection: {
        reconnect: true,
        secure: true,
      },
      identity: {
        username: this.clientId,
        password: this.tmiPassword,
      },
      channels: this.channels.split(','),
    });
  }

  private setupClient(options: tmi.Options) {
    this.tmiClient = new tmi.Client(options);

    this.tmiClient.connect();

    this.tmiClient.on('redeem', (...args) => {
      Logger.log({
        channel: args[0],
        user: args[1],
        rewardId: args[2],
        // state: args[3]
      });
    });

    this.tmiClient.on('action', (...args) => this.handleActions(...args));

    this.tmiClient.on(
      'message',
      async (...args) => await this.handleChats(...args),
    );
  }

  private handleActions(
    channel: string,
    state: tmi.ChatUserstate,
    message: string,
    self: boolean,
  ) {
    if (self) return;

    message = message.toLowerCase();

    console.log('Action', {
      state,
    });
  }

  private async handleChats(
    channel: string,
    state: tmi.ChatUserstate,
    message: string,
    self: boolean,
  ) {
    if (self) return;

    const username = state['display-name'];

    console.log('Action', {
      state,
    });

    const chat = await this.chatService.createChat({
      channel,
      message,
      tags: state,
    });

    message = message.toLowerCase();

    const newQuestionReward = this.config.get<string>('REWARD_ID_NEW_QUESTION');
    if (newQuestionReward && state['custom-reward-id'] === newQuestionReward) {
      console.log('Nueva pregunta de la comunidad');
      this.events.newQuestion(chat);
    }

    const hidrateReward = this.config.get<string>('REWARD_ID_HYDRATE');
    if (hidrateReward && state['custom-reward-id'] === hidrateReward) {
      this.events.hydrate(username);
    }

    if (message.includes('hola')) {
      this.tmiClient.say(
        channel,
        `¡Holaaaa! @${state.username}, 🤗 🤗, ¿Cómo estás?`,
      );
    }

    if (message === '!bot-saluda') {
      this.tmiClient.say(channel, `Hola @${state.username}, soy un bot`);
    }

    if (message.includes('!confetti') || message.includes('!c') || message.includes('!yeah')) {
      this.events.sendConfetti();
    }

    if (message === '!jugar') {
      this.tmiClient.say(
        channel,
        `@${state.username}, lo siento de momento no tengo ningún juego instalado!`,
      );
    }

    if (message.includes('!redes') && this.socialLinks.length) {
      this.tmiClient.say(
        channel,
        `
          Por aquí tienes mis redes sociales ❤️: ${this.socialLinks.map(
          (social) => social.command + ' ',
        )}
        `,
      );

      this.socialLinks.forEach((socialLink) => {
        this.tmiClient.say(channel, `${socialLink.name}: ${socialLink.url}`);
      });
    }

    this.socialLinks.forEach((socialLink) => {
      if (message.includes(socialLink.command)) {
        this.tmiClient.say(
          channel,
          `Hey! @${state.username}, mi cuenta de 🤟✍ ${socialLink.name} es: ${socialLink.url}`,
        );
      }
    });
  }
}
