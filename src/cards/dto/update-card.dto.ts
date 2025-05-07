import { CardStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  columnId?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsEnum(CardStatus)
  @ApiPropertyOptional({ enum: CardStatus, example: Object.keys(CardStatus) })
  status: CardStatus;
}
