import { Injectable } from '@nestjs/common';
import sharp = require('sharp');

export interface CropOptions {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Injectable()
export class FilterService {
  async enhance(
    imageBuffer: Buffer,
    grayscale?: boolean,
    threshold?: number,
    invert?: boolean,
    cropOptions?: CropOptions
  ) {
    let image = sharp(imageBuffer);

    if (invert) {
      image = image.negate();
    }

    if (cropOptions) {
      image = image.extract(cropOptions);
    }

    if (grayscale) {
      image = image.grayscale();
    }

    if (threshold) {
      image = image.threshold(threshold);
    }

    return image.toBuffer();
  }

  // TODO Move this function outside another service ?
  bufferToImage(buffer: Buffer) {
    const b64 = Buffer.from(buffer).toString('base64');
    const mimeType = 'image/jpeg';
    return `<img src="data:${mimeType};base64,${b64}" />`;
  }
}
