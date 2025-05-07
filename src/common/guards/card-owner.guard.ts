import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CardsService } from '../../cards/cards.service';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { sub?: string } = context
      .switchToHttp()
      .getRequest();

    const cardId = request.params.cardId;
    const userId = request.sub;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const card = await this.cardsService.findCardById(cardId);

    if (!card) {
      throw new NotFoundException(`Card with id: ${cardId} not found`);
    }

    if (card.authorId !== userId) {
      throw new ForbiddenException('You must be the card owner');
    }

    return true;
  }
}
