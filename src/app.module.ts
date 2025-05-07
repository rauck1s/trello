import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { ColumnsModule } from './columns/columns.module';
import { CommentsModule } from './comments/comments.module';
import { CardOwnerGuard } from './common/guards/card-owner.guard';
import { ColumnOwnerGuard } from './common/guards/column-owner.guard';
import { CommentOwnerGuard } from './common/guards/comment-owner.guard';

@Module({
  imports: [CardsModule, ColumnsModule, CommentsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, CardOwnerGuard, ColumnOwnerGuard, CommentOwnerGuard],
})
export class AppModule {}
