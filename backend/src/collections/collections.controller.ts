import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiOkResponse({ description: 'Listado de colecciones activas.' })
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Detalle de una coleccion por slug.' })
  findBySlug(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }
}
