import { MovieStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class UpdateUserMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  image?: string;

  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
