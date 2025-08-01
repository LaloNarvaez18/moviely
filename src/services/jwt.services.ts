import jwt from 'jsonwebtoken';
import { IJwtService } from '../types/users';

export default class JwtService implements IJwtService{
  constructor(
    private readonly accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || '',
    private readonly refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || '',
  ) { }

  signAccessToken(userId: number, role: string, additionalPayload?: {}): string {
    const payload = {
      sub: userId,
      scope: role,
      type: 'access',
      ...additionalPayload
    }

    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '1h'
    });
  }

  signRefreshToken(userId: number): string  {
    const payload = {
      sub: userId,
      type: 'access',
    };

    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '7d'
    });
  }
}
