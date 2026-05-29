import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  validateSync,
} from 'class-validator';

const DEFAULT_CORS_ORIGINS =
  'http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173';

class EnvironmentVariables {
  @IsIn(['development', 'test', 'production'])
  NODE_ENV = 'development';

  @Transform(({ value }) => Number(value || 3001))
  @IsInt()
  @Min(1)
  PORT = 3001;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGINS = DEFAULT_CORS_ORIGINS;

  @IsString()
  @IsNotEmpty()
  API_PREFIX = 'api';

  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }

    return String(value ?? 'true').toLowerCase() === 'true';
  })
  @IsBoolean()
  SWAGGER_ENABLED = true;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    {
      NODE_ENV: 'development',
      PORT: 3001,
      CORS_ORIGINS: DEFAULT_CORS_ORIGINS,
      API_PREFIX: 'api',
      SWAGGER_ENABLED: true,
      ...config,
    },
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  if (
    validatedConfig.NODE_ENV === 'production' &&
    validatedConfig.CORS_ORIGINS.split(',').some((origin) => origin.trim() === '*')
  ) {
    throw new Error('CORS_ORIGINS cannot contain * in production.');
  }

  return validatedConfig;
}
