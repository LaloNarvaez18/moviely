import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  User,
  AuthenticatedUser,
  CreateUserDto,
  IUserRepository,
  IAuthService
} from '../types/users';

export default class AuthService implements IAuthService {
  constructor(
    private readonly repository: IUserRepository
  ) { }

  async signUpUser(user: CreateUserDto): Promise<AuthenticatedUser> {
    const newUser: User = await this.repository.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    });

    const authUser = this.mapAuthenticatedUser(newUser);
    return authUser;
  }

  async signInUser(email: string, password: string): Promise<AuthenticatedUser> {
    const user: User | null = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const authUser = this.mapAuthenticatedUser(user);
    return authUser;
  }

  private mapAuthenticatedUser(user: User): AuthenticatedUser {
    const { password, ...userWithoutSensitive } = user
    const { refreshToken, token } = this.signToken({
      sub: user.id,
      scope: user.role
    });
    return { ...userWithoutSensitive, token, refreshToken }
  }

  private signToken(payload: {
    sub: number;
    scope: string | null;
  }) {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const refreshToken = '';
    return { token, refreshToken }
  }
}
