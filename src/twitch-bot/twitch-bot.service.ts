import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as tmi from 'tmi.js';

@Injectable()
export class TwitchBotService {
  private tmiClient: tmi.Client;
  private clientId = this.config.get<string>('TWITCH_API_CLIENT_ID');
  private tmiPassword = this.config.get<string>('TWITCH_TMI_PASSWORD');
  private channels = this.config.get<string>('TWITCH_CHANNEL');

  constructor(private readonly config: ConfigService) {
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

    if (message.toLowerCase() === '!hello') {
      this.tmiClient.say(channel, `@${tags.username}, heya!`);
    }

    if (message.toLowerCase() === '!jugar') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, lo siento de momento no tengo ningún juego instalado!`,
      );
    }
    if (message.toLowerCase() === '!github') {
      this.tmiClient.say(
        channel,
        `@${tags.username}, 🖤 mi github es https://github.com/ruslanguns!`,
      );
    }

    if (message.toLocaleLowerCase().includes('!redes')) {
      this.tmiClient.say(
        channel,
        `
          Por aquí las redes sociales de RusGunx ❤️: 
            ___+ 🟣Twitch: https://twitch.tv/rusgunx 
            ___+ 🔵Twitter: https://twitter.com/ruslangonzalez
            ___+ ⚫️Github: https://github.com/ruslanguns
            ___+ ⚪️ LinkedIn: https://linkedin.com/in/ruslangonzalezb
            ___+ 🔴Youtube: https://youtube.com/ruslangonzalez
        `,
      );
    }
  }
}
