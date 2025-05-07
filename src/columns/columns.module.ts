import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ColumnsController } from './columns.controller';
import { CardsService } from '../cards/cards.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ColumnsService } from './columns.service';
import { ColumnOwnerGuard } from '../common/guards/column-owner.guard';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [ColumnsController],
  providers: [CardsService, PrismaService, ColumnsService, ColumnOwnerGuard],
  exports: [ColumnsService],
})
export class ColumnsModule {}
