import bcrypt from 'bcrypt';
import {
  User,
  UserWithoutSensitive,
  CreateUserDto,
  UpdateUserDto,
  IUserRepository,
  IUserService,
} from '../types/users';

export default class UserService implements IUserService {
  constructor(
    private readonly repository: IUserRepository
  ) { }

  async createUser(user: CreateUserDto): Promise<UserWithoutSensitive> {
    const newUser: User = await this.repository.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    });

    return this.toSafeUser(newUser);
  }

  async findUsers(): Promise<UserWithoutSensitive[]> {
    const users: User[] = await this.repository.findAll();
    if (users.length === 0) {
      throw new Error("No users were found");
    }

    return users.map((user) => this.toSafeUser(user));
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user: User | null = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserWithoutSensitive> {
    const user: User | null = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.repository.update(id, data);

    return this.toSafeUser(updatedUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user: User | null = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await this.repository.delete(id)
    return true;
  }

  public toSafeUser(user: User): UserWithoutSensitive {
    const {
      password,
      recoveryToken,
      ...safeUser
    } = user;

    return safeUser;
  }
}
