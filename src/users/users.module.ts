import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CardsService } from '../cards/cards.service';
import { ColumnsService } from '../columns/columns.service';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    CardsService,
    ColumnsService,
    CommentsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
