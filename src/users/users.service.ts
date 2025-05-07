import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { UserResponse } from './responses/user.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { configuration } from '../config/configuration';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<string> {
    const checkUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (checkUser) {
      throw new ConflictException('email already registered!');
    }

    const { password } = dto;
    const hash = await this.hashData(password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        passwordHash: hash,
        gender: dto.gender,
      },
      select: { id: true },
    });

    const token: string = await this.jwt.signAsync(
      { sub: user.id },
      {
        secret: configuration().JWT_SECRET,
      },
    );

    return token;
  }

  async signIn(dto: SignInDto): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('email already registered!');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Wrong password');
    }

    const token: string = await this.jwt.signAsync(
      { sub: user.id },
      {
        secret: configuration().JWT_SECRET,
      },
    );

    return token;
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        gender: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUserById(id: string, dto: UpdateUserDto): Promise<UserResponse> {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        gender: true,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<UserResponse> {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        gender: true,
      },
    });
  }

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(data, salt);
  }
}
