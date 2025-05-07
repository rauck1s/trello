import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentOwnerGuard } from '../common/guards/comment-owner.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CommentsController],
  providers: [PrismaService, CommentsService, CommentOwnerGuard],
  exports: [CommentsService],
})
export class CommentsModule {}
