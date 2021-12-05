import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

export enum SupportedLanguage {
  French = 'fra',
  English = 'eng',
}

@Injectable()
export class TesseractService {
  async ocr(imageBuffer: Buffer, language: SupportedLanguage): Promise<string> {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage(language.toString());
    await worker.initialize(language.toString());
    const {
      data: { text },
    } = await worker.recognize(imageBuffer);
    await worker.terminate();
    return text;
  }
}
