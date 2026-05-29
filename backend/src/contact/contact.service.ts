import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactMessageDto: CreateContactMessageDto) {
    const message = await this.prisma.contactMessage.create({
      data: {
        ...createContactMessageDto,
        email: createContactMessageDto.email.toLowerCase(),
      },
    });

    return {
      id: message.id,
      received: true,
      message: 'Mensaje recibido correctamente.',
    };
  }
}
