import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserCreateInput } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(input: UserCreateInput): Promise<User> {
    const { name, email } = input;
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }
}
