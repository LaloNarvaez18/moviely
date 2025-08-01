import bcrypt from 'bcrypt';
import {
  User,
  AuthenticatedUser,
  CreateUserDto,
  IAuthService,
  IUserService,
  IJwtService,
  UserWithoutSensitive
} from '../types/users';

export default class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private readonly jwtService: IJwtService
  ) { }

  async signUpUser(user: CreateUserDto): Promise<AuthenticatedUser> {
    const newUser: UserWithoutSensitive = await this.userService.createUser(user);
    const token = this.jwtService.signAccessToken(newUser.id, newUser.role);
    const refreshToken = this.jwtService.signRefreshToken(newUser.id);

    return {
      ...newUser,
      token,
      refreshToken
    };
  }

  async signInUser(email: string, password: string): Promise<AuthenticatedUser> {
    const user: User | null = await this.userService.findUserByEmail(email)
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.signAccessToken(user.id, user.role);
    const refreshToken = this.jwtService.signRefreshToken(user.id);
    const safeUser = this.userService.toSafeUser(user);

    return {
      ...safeUser,
      token,
      refreshToken
    };
  }
}
