import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('search')
  search(@Query('query') query = '') {
    return this.tmdbService.search(query);
  }

  @Get('popular')
  popular() {
    return this.tmdbService.popular();
  }

  @Get('movie/:id')
  details(@Param('id') id: string) {
    return this.tmdbService.details(id);
  }
}
