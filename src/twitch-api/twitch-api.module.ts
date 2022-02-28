import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwitchApiService } from './twitch-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      baseURL: 'https://api.twitch.tv/helix',
    }),
  ],
  providers: [TwitchApiService],
  exports: [TwitchApiService],
})
export class TwitchApiModule {}
