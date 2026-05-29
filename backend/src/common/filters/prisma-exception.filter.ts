import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const mappedException = this.mapException(exception);
    const status = mappedException.getStatus();

    response.status(status).json({
      statusCode: status,
      message: mappedException.message,
      error: mappedException.name,
    });
  }

  private mapException(exception: Prisma.PrismaClientKnownRequestError) {
    if (exception.code === 'P2002') {
      return new ConflictException('El registro ya existe.');
    }

    if (exception.code === 'P2025') {
      return new NotFoundException('El registro solicitado no existe.');
    }

    return new ConflictException('No fue posible completar la operacion solicitada.');
  }
}
