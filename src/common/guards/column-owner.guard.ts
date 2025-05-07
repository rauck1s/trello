import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsService } from '../../columns/columns.service';
import { Request } from 'express';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private readonly columnService: ColumnsService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request & { sub?: string } = context
      .switchToHttp()
      .getRequest();

    const columnId = request.params.columnId;
    const userId = request.sub;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const column = await this.columnService.findColumnById(columnId);

    if (!column) {
      throw new NotFoundException(`Column with id: ${columnId} not found`);
    }

    if (column.userId !== userId) {
      throw new ForbiddenException('You must be the column owner');
    }

    return true;
  }
}
