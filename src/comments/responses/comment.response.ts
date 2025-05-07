import { ApiProperty } from '@nestjs/swagger';

export class CommentResponse {
  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly id: string;

  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly cardId: string;

  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly authorId: string;

  @ApiProperty({ example: 'tralalelo tralala' })
  readonly content: string;
}
