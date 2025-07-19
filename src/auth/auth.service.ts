import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    try {
      const { data: user } =
        await this.usersService.getUserByUsername(username);
      if (!user) throw new Error('Invalid credentials!');
      const { password: userPassword, ...userData } = user;
      const isPasswordValid = await bcrypt.compare(password, userPassword);
      if (!isPasswordValid) throw new Error('Invalid credentials!');
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      });
      return {
        data: { user: userData, accessToken },
        message: 'Login successful',
      };
    } catch (e) {
      return { error: e };
    }
  }

  async signup(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.usersService.create(user);
  }
}
