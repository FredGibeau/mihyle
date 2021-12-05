import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TesseractService } from './tesseract.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [TesseractService],
})
export class AppModule {}
