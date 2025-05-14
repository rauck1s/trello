import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CardResponse } from './responses/card.response';
import { UpdateCardDto } from './dto/update-card.dto';
import { CommentResponse } from '../comments/responses/comment.response';
import { CommentsService } from '../comments/comments.service';
import { JwtGuard } from '../common/guards/jwt.guard';
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
import { CardOwnerGuard } from '../common/guards/card-owner.guard';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(
    private cardService: CardsService,
    private commentsService: CommentsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create card' })
  @ApiBody({ description: 'create card data', type: CreateCardDto })
  @ApiCreatedResponse({ type: CardResponse })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiBearerAuth()
  async createCard(@Body() dto: CreateCardDto): Promise<CardResponse> {
    return this.cardService.createCard(dto);
  }

  @Get(':cardId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get card by id' })
  @ApiOkResponse({ description: 'card found', type: CardResponse })
  @ApiBadRequestResponse({ description: 'invalid card id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'card not found' })
  @ApiBearerAuth()
  async getCardById(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<CardResponse> {
    return this.cardService.findCardById(cardId);
  }

  @Get(':cardId/comments')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get comments on card' })
  @ApiOkResponse({
    description: 'comments found',
    type: CommentResponse,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'invalid card id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'comments not found' })
  @ApiBearerAuth()
  async getAllCommentsOnCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<CommentResponse[]> {
    return this.commentsService.getAllCommentsOnCard(cardId);
  }

  @Patch(':cardId')
  @UseGuards(JwtGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'patch card' })
  @ApiBody({ description: 'update card data', type: UpdateCardDto })
  @ApiOkResponse({
    description: 'card successfully updated',
    type: CardResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'card not found' })
  @ApiBearerAuth()
  async updateCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() dto: UpdateCardDto,
  ): Promise<CardResponse> {
    return this.cardService.updateCard(cardId, dto);
  }

  @Delete(':cardId')
  @UseGuards(JwtGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'delete card' })
  @ApiOkResponse({
    description: 'card successfully deleted',
    type: CardResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'card not found' })
  @ApiBearerAuth()
  async deleteCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<CardResponse> {
    return this.cardService.deleteCard(cardId);
  }
}
