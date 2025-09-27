import { AuthTokenInterface } from '../interfaces/auth-token.interface';

export class AuthToken implements AuthTokenInterface {
  id: any;
  ttl: any;
  created: any;
  userId: any;

  constructor(data?: AuthTokenInterface) {
    if (data) {
      this.id = data.id;
      this.ttl = data.ttl;
      this.created = data.created;
    }
  }
}