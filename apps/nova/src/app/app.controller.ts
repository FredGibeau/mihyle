// Used for accessing the Express Multer Constant
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { Controller, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TesseractService } from './tesseract.service';

@Controller()
export class AppController {
  constructor(private readonly appService: TesseractService) {}

  @Get('ocr')
  @UseInterceptors(FileInterceptor('image'))
  async ocr(@UploadedFile() image: Express.Multer.File) {
    const ocr = await this.appService.ocr(image.buffer);
    return ocr;
  }
}
