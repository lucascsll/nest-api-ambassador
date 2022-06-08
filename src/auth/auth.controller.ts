import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('admin/session')
  async creatSessios(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authServise.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
