import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
