import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  @ApiProperty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty({ enum: Gender, example: Object.keys(Gender) })
  gender: Gender;
}
