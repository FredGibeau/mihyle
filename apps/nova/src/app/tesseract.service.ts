import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class TesseractService {
  async ocr(buffer: Buffer): Promise<string> {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('fra');
    await worker.initialize('fra');
    const {
      data: { text },
    } = await worker.recognize(buffer);
    await worker.terminate();
    return text;
  }
}
