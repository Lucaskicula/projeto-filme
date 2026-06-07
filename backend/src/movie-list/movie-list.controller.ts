import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MovieStatus } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { MovieListService } from './movie-list.service';

type AuthRequest = Request & {
  user: { id: string; email: string };
};

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get()
  findAll(@Req() req: AuthRequest, @Query('status') status?: MovieStatus) {
    return this.movieListService.findAll(req.user.id, status);
  }

  @Post()
  addToWatchlist(@Req() req: AuthRequest, @Body() dto: CreateUserMovieDto) {
    return this.movieListService.addToWatchlist(req.user.id, dto);
  }

  @Patch(':id/watched')
  markAsWatched(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.movieListService.markAsWatched(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateUserMovieDto,
  ) {
    return this.movieListService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.movieListService.remove(req.user.id, id);
  }
}
