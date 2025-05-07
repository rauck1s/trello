import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @ApiPropertyOptional()
  surname?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @ApiPropertyOptional()
  password?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiPropertyOptional({ enum: Gender, example: Object.keys(Gender) })
  gender?: Gender;
}
