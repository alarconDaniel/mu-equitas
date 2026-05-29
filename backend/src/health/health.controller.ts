import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({ description: 'Estado de la API.' })
  check() {
    return {
      status: 'ok',
      service: 'munequitas-api',
      timestamp: new Date().toISOString(),
    };
  }
}
