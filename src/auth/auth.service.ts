import { NotesRepository } from './../notes/notes.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByKeyValue('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    console.log('🚀 ~ AuthService ~ login ~ user:', user);
    const userData = await this.usersRepository.findByKeyValue(
      'email',
      user.email,
    );
    console.log('🚀 ~ AuthService ~ login ~ userData:', userData);

    const payload = { email: user.email, sub: userData._id };

    // Generate tokens
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token expires in 7 days
    });

    await this.usersRepository.updateLastLogin(userData._id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new Error('User not found');
      }
      const newPayload = { email: user.email, sub: user._id };
      return {
        accessToken: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
