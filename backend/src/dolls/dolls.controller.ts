import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryDollsDto } from './dto/query-dolls.dto';
import { DollsService } from './dolls.service';

@ApiTags('Dolls')
@Controller('dolls')
export class DollsController {
  constructor(private readonly dollsService: DollsService) {}

  @Get()
  @ApiOkResponse({ description: 'Listado paginado de productos del catalogo.' })
  findAll(@Query() query: QueryDollsDto) {
    return this.dollsService.findAll(query);
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Detalle de un producto por slug.' })
  findBySlug(@Param('slug') slug: string) {
    return this.dollsService.findBySlug(slug);
  }
}
