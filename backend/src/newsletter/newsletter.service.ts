import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(createSubscriberDto: CreateNewsletterSubscriberDto) {
    const email = createSubscriberDto.email.toLowerCase();
    const existingSubscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        await this.prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true },
        });
      }

      return {
        subscribed: true,
        message: 'El correo ya estaba suscrito.',
      };
    }

    await this.prisma.newsletterSubscriber.create({
      data: { email, isActive: true },
    });

    return {
      subscribed: true,
      message: 'Suscripcion registrada correctamente.',
    };
  }
}
