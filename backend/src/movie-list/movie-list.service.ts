import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MovieStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';

@Injectable()
export class MovieListService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string, status?: MovieStatus) {
    return this.prisma.userMovie.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async addToWatchlist(userId: string, dto: CreateUserMovieDto) {
    return this.prisma.userMovie.upsert({
      where: {
        userId_tmdbId: {
          userId,
          tmdbId: dto.tmdbId,
        },
      },
      update: {
        title: dto.title,
        image: dto.image,
        status: MovieStatus.WATCHLIST,
        rating: dto.rating,
      },
      create: {
        userId,
        tmdbId: dto.tmdbId,
        title: dto.title,
        image: dto.image,
        rating: dto.rating,
      },
    });
  }

  async markAsWatched(userId: string, id: string) {
    await this.ensureOwner(userId, id);

    return this.prisma.userMovie.update({
      where: { id },
      data: { status: MovieStatus.WATCHED },
    });
  }

  async update(userId: string, id: string, dto: UpdateUserMovieDto) {
    await this.ensureOwner(userId, id);

    return this.prisma.userMovie.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwner(userId, id);
    await this.prisma.userMovie.delete({ where: { id } });

    return { success: true };
  }

  private async ensureOwner(userId: string, id: string) {
    const movie = await this.prisma.userMovie.findUnique({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Filme nao encontrado');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException('Voce nao pode alterar este filme');
    }
  }
}
