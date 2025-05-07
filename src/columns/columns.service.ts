import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnResponse } from './responses/column.response';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async createColumn(dto: CreateColumnDto): Promise<ColumnResponse> {
    return this.prisma.column.create({
      data: {
        userId: dto.userId,
        title: dto.title,
      },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });
  }

  async findColumnById(columnId: string): Promise<ColumnResponse> {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });

    if (!column) {
      throw new NotFoundException(`Column with id ${columnId} not found`);
    }

    return column;
  }

  async getAllColumnsByUserId(userId: string): Promise<ColumnResponse[]> {
    return this.prisma.column.findMany({
      where: { userId: userId },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });
  }

  async updateColumn(
    columnId: string,
    dto: UpdateColumnDto,
  ): Promise<ColumnResponse> {
    const column = await this.prisma.column.update({
      where: { id: columnId },
      data: dto,
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });

    if (!column) {
      throw new NotFoundException(`Column with id ${columnId} not found`);
    }

    return column;
  }

  async deleteColumn(columnId: string): Promise<ColumnResponse> {
    return this.prisma.column.delete({
      where: { id: columnId },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });
  }
}
