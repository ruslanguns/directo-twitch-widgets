import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventsGateway } from 'src/events/events.gateway';
import * as tmi from 'tmi.js';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class TwitchBotService {
  private tmiClient: tmi.Client;
  private clientId = this.config.get<string>('TWITCH_API_CLIENT_ID');
  private tmiPassword = this.config.get<string>('TWITCH_TMI_PASSWORD');
  private channels = this.config.get<string>('TWITCH_CHANNEL');

  constructor(
    private readonly config: ConfigService,
    private readonly chatService: ChatService,
    private readonly events: EventsGateway,
  ) {
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

    this.tmiClient.on('message', async (...args) => this.onMessage(...args));
  }

  private async onMessage(
    channel: string,
    tags: Record<string, any>,
    message: string,
    self: boolean,
  ) {
    if (self) return;

    const newQuestionReward = '741647f8-88e6-412c-836c-1bcdcffc3eb0';

    const chat = await this.chatService.createChat({
      channel,
      message,
      tags,
    });

    if (tags['custom-reward-id'] === newQuestionReward) {
      console.log('Nueva pregunta de la comunidad');
      this.events.newQuestion(chat);
    }

    if (message.toLocaleLowerCase().includes('hola')) {
      this.tmiClient.say(
        channel,
        `¡Holaaaa! @${tags.username}, 🤗 🤗, ¿Cómo estás?`,
      );
    }

    if (message.toLowerCase() === '!bot-saluda') {
      this.tmiClient.say(channel, `Hola @${tags.username}, soy un bot`);
    }

    if (message.toLowerCase() === '!confetti') {
      this.events.sendConfetti();
    }

    if (message.toLowerCase() === '!jugar') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, lo siento de momento no tengo ningún juego instalado!`,
      );
    }

    if (message.toLocaleLowerCase().includes('!redes')) {
      this.tmiClient.say(
        channel,
        `
          Por aquí las redes sociales de RusGunx ❤️, 
          pero tambien puedes invocarlas individualmente 
          con los comandos: !github, !twitter, !twitch, !linkedkin, !youtube 
        `,
      );
      this.tmiClient.say(channel, `🖤 GitHub: https://github.com/ruslanguns`);
      this.tmiClient.say(
        channel,
        `💜 Twitter: https://twitter.com/ruslangonzalez`,
      );
      this.tmiClient.say(channel, `💜 Twitch: https://twitch.tv/rusgunx`);
      this.tmiClient.say(
        channel,
        `🤍 LinkedIn: https://linkedin.com/in/ruslangonzalezb`,
      );
      this.tmiClient.say(
        channel,
        `🔴 Youtube: https://www.youtube.com/ruslangonzalez`,
      );
    }

    if (message.toLowerCase() === '!github') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, mi cuenta de 🖤 GitHub: https://github.com/ruslanguns`,
      );
    }

    if (message.toLowerCase() === '!twitter') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, mi cuenta de 🔵Twitter es @ruslangonzalez > https://twitter.com/ruslangonzalez`,
      );
    }

    if (message.toLowerCase() === '!twitch') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, mi cuenta de 💜 Twitch es @RusGunx > https://twitch.tv/rusgunx`,
      );
    }

    if (message.toLowerCase() === '!linkedkin') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, mi cuenta de 🤍 LinkedIn es /in/ruslangonzalezb > https://linkedin.com/in/ruslangonzalezb`,
      );
    }

    if (message.toLowerCase() === '!youtube') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, mi cuenta de 💘 Youtube es @ruslangonzalez > https://www.youtube.com/ruslangonzalez`,
      );
    }
  }
}
