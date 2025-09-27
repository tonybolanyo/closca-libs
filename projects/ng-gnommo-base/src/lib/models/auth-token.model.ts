import { AuthTokenInterface } from '../interfaces/auth-token.interface';

export class AuthToken implements AuthTokenInterface {
  id?: string;
  ttl?: number;
  created?: Date;
  userId?: string;

  constructor(data?: AuthTokenInterface) {
    if (data) {
      this.id = data.id;
      this.ttl = data.ttl;
      this.created = data.created instanceof Date ? data.created : (data.created ? new Date(data.created) : undefined);
      this.userId = data.userId;
    }
  }
}