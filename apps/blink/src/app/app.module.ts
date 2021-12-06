import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { RegexService } from './regex.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RegexService],
})
export class AppModule {}
