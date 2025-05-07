import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardStatus } from '@prisma/client';

export class CreateCardDto {
  @IsUUID()
  @ApiProperty()
  columnId: string;

  @IsUUID()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsEnum(CardStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: CardStatus, example: Object.keys(CardStatus) })
  status: CardStatus;
}
