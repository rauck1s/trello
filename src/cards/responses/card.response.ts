import { CardStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CardResponse {
  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly id: string;

  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly authorId: string;

  @ApiProperty({ example: 'g99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly columnId: string;

  @ApiProperty({ example: 'First tusk' })
  readonly title: string;

  @ApiProperty({ example: 'do something' })
  readonly description?: string;

  @ApiProperty({ example: 'in_progress' })
  readonly status: CardStatus;
}
