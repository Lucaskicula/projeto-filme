import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return user;
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    const currentUser = await this.findProfile(id);

    if (dto.email && dto.email !== currentUser.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail) {
        throw new ConflictException('E-mail ja esta em uso');
      }
    }

    const password = dto.password ? await bcrypt.hash(dto.password, 12) : undefined;

    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        password,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }
}
