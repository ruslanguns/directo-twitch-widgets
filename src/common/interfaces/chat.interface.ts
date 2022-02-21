export interface Chat {
  tags: Record<string, any>;
  channel: string;
  message: string;
  userInfo?: Record<string, any>;
}
