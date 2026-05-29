import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CombosService } from './combos.service';

@ApiTags('Combos')
@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Get()
  @ApiOkResponse({ description: 'Listado de combos del catalogo.' })
  findAll() {
    return this.combosService.findAll();
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Detalle de un combo por slug.' })
  findBySlug(@Param('slug') slug: string) {
    return this.combosService.findBySlug(slug);
  }
}
