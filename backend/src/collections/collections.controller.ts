import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiOkResponse({ description: 'Listado de colecciones.' })
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Detalle de una coleccion por slug.' })
  findBySlug(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Coleccion creada.' })
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Coleccion actualizada.' })
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Coleccion eliminada.' })
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }
}
