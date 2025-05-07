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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserResponse } from './responses/user.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnsService } from '../columns/columns.service';
import { ColumnResponse } from '../columns/responses/column.response';
import { CardResponse } from '../cards/responses/card.response';
import { CardsService } from '../cards/cards.service';
import { CommentsService } from '../comments/comments.service';
import { CommentResponse } from '../comments/responses/comment.response';
import { JwtGuard } from '../common/guards/jwt.guard';
import { UserCurrent } from '../common/decorators/user-current.decorator';

@Injectable()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
    private readonly cardService: CardsService,
    private readonly commentService: CommentsService,
  ) {}

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'user signUp', description: 'returns JWT token' })
  @ApiBody({ description: 'signUp user data', type: SignUpDto })
  @ApiCreatedResponse({
    description: 'JWT token',
  })
  @ApiConflictResponse({ description: 'email already registered' })
  async signUp(@Body() dto: SignUpDto): Promise<string> {
    return this.usersService.signUp(dto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'user signIn', description: 'returns JWT token' })
  @ApiBody({ description: 'signUp user data', type: SignInDto })
  @ApiOkResponse({ description: 'JWT token' })
  @ApiUnauthorizedResponse({ description: 'wrong email or password' })
  async signIn(@Body() dto: SignInDto): Promise<string> {
    return this.usersService.signIn(dto);
  }

  @Get(':userId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get user by id' })
  @ApiOkResponse({ description: 'user found', type: UserResponse })
  @ApiBadRequestResponse({ description: 'invalid user id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  async getUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponse> {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId/columns')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get user columns' })
  @ApiOkResponse({
    description: 'columns found',
    type: UserResponse,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'invalid user id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'columns not found' })
  @ApiBearerAuth()
  async getUserColumns(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<ColumnResponse[]> {
    return this.columnsService.getAllColumnsByUserId(userId);
  }

  @Get(':userId/cards')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get user cards' })
  @ApiOkResponse({
    description: 'cards found',
    type: CardResponse,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'invalid user id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'cards not found' })
  @ApiBearerAuth()
  async getUserCards(@Param('userId') userId: string): Promise<CardResponse[]> {
    return this.cardService.getAllCardsByUserId(userId);
  }

  @Get(':userId/comments')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get user comments' })
  @ApiOkResponse({
    description: 'comments not found',
    type: CommentResponse,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'invalid user id' })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'comments not found' })
  @ApiBearerAuth()
  async getUserComments(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommentResponse[]> {
    return this.commentService.getAllCommentsByUserId(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'patch user' })
  @ApiBody({ type: UpdateUserDto, description: 'updated user data' })
  @ApiOkResponse({
    description: 'user successfully update',
    type: UserResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UserCurrent() currentUserId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponse> {
    if (userId !== currentUserId) {
      throw new UnauthorizedException({
        message: 'You can only update your own profile',
      });
    }

    return this.usersService.updateUserById(userId, dto);
  }

  @Delete(':userId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'delete user' })
  @ApiOkResponse({
    description: 'user successfully delete',
    type: UserResponse,
  })
  @ApiUnauthorizedResponse({ description: 'user not authenticated' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UserCurrent() currentUserId: string,
  ): Promise<UserResponse> {
    if (userId !== currentUserId) {
      throw new UnauthorizedException({
        message: 'You can only delete your own account',
      });
    }

    return this.usersService.deleteUser(userId);
  }
}
