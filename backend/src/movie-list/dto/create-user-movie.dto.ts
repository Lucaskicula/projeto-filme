import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateUserMovieDto {
  @IsInt()
  tmdbId!: number;

  @IsString()
  title!: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  image?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
