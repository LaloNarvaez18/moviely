import Repository from "./repository"

export interface User {
  id: number
  name: string
  lastName: string
  password: string
  recoveryToken: string | null
  birthdate: Date
  email: string
  phone: string | null
  role: string | null
}

export interface UserWithoutSensitive extends Omit<User, 'password' | 'recoveryToken'> {}
export interface CreateUserDto extends Omit<User, 'id'> {}
export interface UpdateUserDto extends Partial<Omit<CreateUserDto, 'password'>> {}

export interface IUserRepository extends Repository<CreateUserDto, UpdateUserDto, User> {
  findByEmail(email: string): Promise<User | null>
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<UserWithoutSensitive>
  findUsers(): Promise<UserWithoutSensitive[]>
  findUserById(id: number): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  updateUser(id: number, data: UpdateUserDto): Promise<UserWithoutSensitive>
  deleteUser(id: number): Promise<boolean>
  toSafeUser(user: User): UserWithoutSensitive
}

export interface AuthenticatedUser extends UserWithoutSensitive {
  refreshToken: string
  token: string
}

export interface IAuthService {
  signInUser(email: string, password: string): Promise<AuthenticatedUser>
  signUpUser(user: CreateUserDto): Promise<AuthenticatedUser>
}

export interface IJwtService {
  signAccessToken(userId: number, role: string | null, additionalPayload?: {}): string
  signRefreshToken(userId: number): string
}
