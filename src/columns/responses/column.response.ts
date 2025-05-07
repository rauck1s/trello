import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponse {
  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly id: string;

  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly userId: string;

  @ApiProperty({ example: 'Today' })
  readonly title: string;
}
