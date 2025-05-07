import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponse } from './responses/comment.response';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto): Promise<CommentResponse> {
    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content,
        cardId: dto.cardId,
        authorId: dto.authorId,
      },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });
    return comment;
  }

  async findCommentById(id: string): Promise<CommentResponse> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  async getAllCommentsByUserId(userId: string): Promise<CommentResponse[]> {
    return this.prisma.comment.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });
  }

  async getAllCommentsOnCard(cardId: string): Promise<CommentResponse[]> {
    return this.prisma.comment.findMany({
      where: { cardId: cardId },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });
  }

  async updateComment(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentResponse> {
    return this.prisma.comment.update({
      where: { id: id },
      data: { content: dto.content },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });
  }

  async deleteComment(id: string): Promise<CommentResponse> {
    return this.prisma.comment.delete({
      where: { id: id },
      select: {
        id: true,
        content: true,
        cardId: true,
        authorId: true,
      },
    });
  }
}
