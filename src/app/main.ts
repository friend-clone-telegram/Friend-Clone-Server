import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '../modules/app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables>);

  await app.listen(configService.get('PORT') || 4000);
})();
