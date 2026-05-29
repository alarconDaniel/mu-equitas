import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';
import { NewsletterService } from './newsletter.service';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Suscripcion registrada.' })
  subscribe(@Body() createSubscriberDto: CreateNewsletterSubscriberDto) {
    return this.newsletterService.subscribe(createSubscriberDto);
  }
}
