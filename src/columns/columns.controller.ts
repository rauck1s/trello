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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnResponse } from './responses/column.response';
import { UpdateColumnDto } from './dto/update-column.dto';
import { CardResponse } from '../cards/responses/card.response';
import { CardsService } from '../cards/cards.service';
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ColumnOwnerGuard } from '../common/guards/column-owner.guard';

@Controller('columns')
export class ColumnsController {
  constructor(
    private columnService: ColumnsService,
    private cardsService: CardsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create column' })
  @ApiBody({ description: 'create column data', type: CreateColumnDto })
  @ApiCreatedResponse({ type: ColumnResponse })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiBearerAuth()
  async createColumn(@Body() dto: CreateColumnDto): Promise<ColumnResponse> {
    return this.columnService.createColumn(dto);
  }

  @Get(':columnId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get column by id' })
  @ApiBadRequestResponse({ description: 'invalid column id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'column not found' })
  @ApiBearerAuth()
  async getColumnById(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<ColumnResponse> {
    return this.columnService.findColumnById(columnId);
  }

  @Get(':columnId/cards')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get cards on column' })
  @ApiOkResponse({
    description: 'cards found',
    type: CardResponse,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'invalid column id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'cards not found' })
  @ApiBearerAuth()
  async getAllCardsOnColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<CardResponse[]> {
    return this.cardsService.getAllCardsOnColumn(columnId);
  }

  @Patch(':columnId')
  @UseGuards(JwtGuard, ColumnOwnerGuard)
  @ApiOperation({ summary: 'patch column' })
  @ApiBody({ description: 'update column data', type: UpdateColumnDto })
  @ApiOkResponse({
    description: 'column successfully updated',
    type: ColumnResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'column not found' })
  @ApiBearerAuth()
  async updateColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() dto: UpdateColumnDto,
  ): Promise<ColumnResponse> {
    return this.columnService.updateColumn(columnId, dto);
  }

  @Delete(':columnId')
  @UseGuards(JwtGuard, ColumnOwnerGuard)
  @ApiOperation({ summary: 'delete column' })
  @ApiOkResponse({
    description: 'column successfully deleted',
    type: ColumnResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiForbiddenResponse({ description: 'access denied' })
  @ApiNotFoundResponse({ description: 'column not found' })
  @ApiBearerAuth()
  async deleteColumn(
    @Param('columnID', ParseUUIDPipe) columnId: string,
  ): Promise<ColumnResponse> {
    return this.columnService.deleteColumn(columnId);
  }
}
