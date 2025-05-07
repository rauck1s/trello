import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardResponse } from './responses/card.response';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async createCard(dto: CreateCardDto): Promise<CardResponse> {
    return this.prisma.card.create({
      data: dto,
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async findCardById(cardId: string): Promise<CardResponse> {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });

    if (!card) {
      throw new NotFoundException(`Card with id: ${cardId} not found`);
    }

    return card;
  }

  async getAllCardsByUserId(userId: string): Promise<CardResponse[]> {
    return this.prisma.card.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async getAllCardsOnColumn(columnId: string): Promise<CardResponse[]> {
    return this.prisma.card.findMany({
      where: { columnId: columnId },
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async updateCard(cardId: string, dto: UpdateCardDto): Promise<CardResponse> {
    const card = await this.prisma.card.update({
      where: { id: cardId },
      data: dto,
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });

    if (!card) {
      throw new NotFoundException(`Card with id: ${cardId} not found`);
    }

    return card;
  }

  async deleteCard(cardId: string): Promise<CardResponse> {
    return this.prisma.card.delete({
      where: { id: cardId },
      select: {
        id: true,
        authorId: true,
        columnId: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }
}
