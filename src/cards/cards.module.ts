import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CardsController } from './cards.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CommentsService } from '../comments/comments.service';
import { CardsService } from './cards.service';
import { CardOwnerGuard } from '../common/guards/card-owner.guard';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CardsController],
  providers: [CommentsService, PrismaService, CardsService, CardOwnerGuard],
  exports: [CardsService],
})
export class CardsModule {}
