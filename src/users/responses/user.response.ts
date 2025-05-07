import { Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 'd99e9062-ec1f-480b-8849-2ca117a83a78' })
  readonly id: string;

  @ApiProperty({ example: 'Dmitri' })
  readonly name: string;

  @ApiProperty({ example: 'Minckevich' })
  readonly surname: string;

  @ApiProperty({ example: 'rauckees0811@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'male' })
  readonly gender: Gender;
}
