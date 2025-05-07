import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from '../../comments/comments.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private commentService: CommentsService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request & { sub?: string } = context
      .switchToHttp()
      .getRequest();

    const commentId = request.params.commentId;
    const userId = request.sub;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const comment = await this.commentService.findCommentById(commentId);

    if (!comment) {
      throw new BadRequestException('comment not exist');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You must be the comment owner');
    }

    return true;
  }
}
