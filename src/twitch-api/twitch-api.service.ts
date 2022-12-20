import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as axiosRetryInterceptor from 'axios-retry-interceptor';
import { lastValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  TwitchTokenResponse, TwitchUserData, TwitchUsersResponse
} from '../common/interfaces';

@Injectable()
export class TwitchApiService implements OnModuleInit {
  accessToken = '';
  clientId = this.config.get<string>('TWITCH_API_CLIENT_ID');
  clientSecret = this.config.get<string>('TWITCH_API_CLIENT_SECRET');

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) { }

  async getUserDetails(login: string): Promise<TwitchUserData> {
    try {
      const http$ = this.http
        .get<TwitchUsersResponse>('users', { params: { login } })
        .pipe(map(({ data }) => data.data[0]));

      return await lastValueFrom(http$);
    } catch (error) {
      console.log(error)
      throw new BadGatewayException(error.message);
    }
  }

  async getAccessToken() {
    try {
      const url = `https://id.twitch.tv/oauth2/token`;
      const http$ = this.http
        .post<TwitchTokenResponse>(url, {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
        })
        .pipe(
          map(({ data }) => data.access_token),
          tap((token) => (this.accessToken = token)),
        );

      return await lastValueFrom(http$);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  onModuleInit() {
    axiosRetryInterceptor(this.http.axiosRef, {
      maxAttempts: 3,
      waitTime: 1000,
      errorCodes: [401],
    });

    this.http.axiosRef.interceptors.request.use(async (config) => {
      if (!config.url.includes('oauth2')) {
        config.headers['Client-ID'] = this.clientId;
      }

      if (!!this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      return config;
    });

    this.http.axiosRef.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          const accessToken = await this.getAccessToken();

          error.config.headers.Authorization = `Bearer ${accessToken}`;

          return this.http.axiosRef(error.config);
        }
        return Promise.reject(error);
      },
    );
  }
}
