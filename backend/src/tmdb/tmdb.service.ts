import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly config: ConfigService) {}

  search(query: string) {
    if (!query.trim()) {
      throw new BadRequestException('Informe o termo de busca');
    }

    return this.request('/search/movie', { query });
  }

  details(id: string) {
    return this.request(`/movie/${id}`);
  }

  popular() {
    return this.request('/movie/popular');
  }

  private async request(path: string, params: Record<string, string> = {}) {
    const apiKey = this.config.get<string>('TMDB_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException('TMDB_API_KEY nao configurada');
    }

    const url = new URL(`${this.baseUrl}${path}`);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('language', 'pt-BR');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new BadRequestException('Erro ao consultar TMDB');
    }

    return response.json();
  }
}
