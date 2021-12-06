// Used for accessing the Express Multer Constant
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { SupportedLanguage, TesseractService } from './tesseract.service';
import { IsEnum } from 'class-validator';

// TODO I find it ugly to have 2 kinds of dtos...
// TODO To externalize
class FromBase64BodyDto {
  base64: string;
}

// TODO To externalize
class FromBase64QueryDto {
  // TODO Default value didn't work.
  @IsEnum(SupportedLanguage)
  language: SupportedLanguage = SupportedLanguage.English;
}

@Controller()
export class AppController {
  constructor(private readonly appService: TesseractService) {}

  @Post('ocr')
  @UseInterceptors(FileInterceptor('image'))
  async ocr(
    @UploadedFile() image: Express.Multer.File,
    language?: SupportedLanguage
  ) {
    const ocr = await this.appService.ocr(image.buffer, language);
    return ocr;
  }

  @Post('ocrFromBase64')
  async ocrFromBuffer(
    @Body() fromBase64BodyDto: FromBase64BodyDto,
    @Query() fromBase64QueryDto: FromBase64QueryDto
  ) {
    console.log(fromBase64BodyDto);
    const ocr = await this.appService.ocr(
      Buffer.from(fromBase64BodyDto.base64, 'base64'),
      fromBase64QueryDto.language
    );
    return ocr;
  }
}
