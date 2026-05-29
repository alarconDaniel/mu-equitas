import { PrismaService } from '../database/prisma.service';
import { NewsletterService } from './newsletter.service';

describe('NewsletterService', () => {
  let service: NewsletterService;
  let prisma: {
    newsletterSubscriber: {
      findUnique: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      newsletterSubscriber: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    service = new NewsletterService(prisma as unknown as PrismaService);
  });

  it('normalizes and stores new subscriber emails', async () => {
    prisma.newsletterSubscriber.findUnique.mockResolvedValue(null);
    prisma.newsletterSubscriber.create.mockResolvedValue({ id: 'subscriber-1' });

    const result = await service.subscribe({ email: 'CLIENTE@EJEMPLO.COM' });

    expect(result.subscribed).toBe(true);
    expect(prisma.newsletterSubscriber.create).toHaveBeenCalledWith({
      data: { email: 'cliente@ejemplo.com' },
    });
  });

  it('is idempotent for existing subscribers', async () => {
    prisma.newsletterSubscriber.findUnique.mockResolvedValue({ id: 'subscriber-1' });

    const result = await service.subscribe({ email: 'cliente@ejemplo.com' });

    expect(result).toEqual({
      subscribed: true,
      message: 'El correo ya estaba suscrito.',
    });
    expect(prisma.newsletterSubscriber.create).not.toHaveBeenCalled();
  });
});
