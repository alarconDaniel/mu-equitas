import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateDollDto } from './dto/create-doll.dto';
import { QueryDollsDto } from './dto/query-dolls.dto';
import { UpdateDollDto } from './dto/update-doll.dto';
import { DollsService } from './dolls.service';

@ApiTags('Dolls')
@Controller('dolls')
export class DollsController {
  constructor(private readonly dollsService: DollsService) {}

  @Get()
  @ApiOkResponse({ description: 'Listado paginado de muñecas.' })
  findAll(@Query() query: QueryDollsDto) {
    return this.dollsService.findAll(query);
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Detalle de una muñeca por slug.' })
  findBySlug(@Param('slug') slug: string) {
    return this.dollsService.findBySlug(slug);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Muñeca creada.' })
  create(@Body() createDollDto: CreateDollDto) {
    return this.dollsService.create(createDollDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Muñeca actualizada.' })
  update(@Param('id') id: string, @Body() updateDollDto: UpdateDollDto) {
    return this.dollsService.update(id, updateDollDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Muñeca eliminada.' })
  remove(@Param('id') id: string) {
    return this.dollsService.remove(id);
  }
}
