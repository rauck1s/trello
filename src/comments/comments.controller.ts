import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponse } from './responses/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { CommentOwnerGuard } from '../common/guards/comment-owner.guard';

@Injectable()
@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create comment' })
  @ApiBody({ description: 'create comment data', type: CreateCommentDto })
  @ApiCreatedResponse({ type: CommentResponse })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiBearerAuth()
  async createComment(@Body() dto: CreateCommentDto): Promise<CommentResponse> {
    return this.commentService.createComment(dto);
  }

  @Get(':commentId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get comment by id' })
  @ApiOkResponse({ description: 'comment found', type: CommentResponse })
  @ApiBadRequestResponse({ description: 'invalid comment id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @ApiBearerAuth()
  async getCommentById(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<CommentResponse> {
    return this.commentService.findCommentById(commentId);
  }

  @Patch(':commentId')
  @UseGuards(JwtGuard, CommentOwnerGuard)
  @ApiOperation({ summary: 'patch comment' })
  @ApiBody({ description: 'updated comment data', type: UpdateCommentDto })
  @ApiOkResponse({
    description: 'user successfully update',
    type: CommentResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'column not found' })
  @ApiBearerAuth()
  async updateComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentResponse> {
    return this.commentService.updateComment(commentId, dto);
  }

  @Delete(':commentId')
  @UseGuards(JwtGuard, CommentOwnerGuard)
  @ApiOperation({ summary: 'delete comment' })
  @ApiOkResponse({
    description: 'comment successfully deleted',
    type: CommentResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @ApiBearerAuth()
  async deleteComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<CommentResponse> {
    return this.commentService.deleteComment(commentId);
  }
}
