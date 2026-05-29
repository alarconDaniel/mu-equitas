import { plainToInstance } from 'class-transformer';
import { IsInt, IsString, IsUrl, Min, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsInt()
  @Min(1)
  PORT = 3001;

  @IsString()
  DATABASE_URL =
    'postgresql://postgres:postgres@localhost:5432/munequitas_db?schema=public';

  @IsUrl({ require_tld: false })
  CORS_ORIGIN = 'http://localhost:3000';
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    {
      PORT: 3001,
      DATABASE_URL:
        'postgresql://postgres:postgres@localhost:5432/munequitas_db?schema=public',
      CORS_ORIGIN: 'http://localhost:3000',
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

  return validatedConfig;
}
