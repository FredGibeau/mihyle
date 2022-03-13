// Used for accessing the Express Multer Constant
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CropOptions, FilterService } from './filter.service';
import {
  IsBase64,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// TODO Move this outside
class EnhanceImageDto {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  grayscale?: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  invert?: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(255)
  @IsOptional()
  threshold?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  left?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  top?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  width?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  toBuffer?: boolean = false;
}
@Controller()
export class AppController {
  constructor(private readonly filterService: FilterService) {}

  @Post('enhance')
  @UseInterceptors(FileInterceptor('image'))
  async enhance(
    @UploadedFile() image: Express.Multer.File,
    @Query() enhanceImageDto: EnhanceImageDto
  ) {
    try {
      if (!image) {
        throw new HttpException('Image is null', HttpStatus.BAD_REQUEST);
      }
      const cropOptions = this.extractCropOptions(enhanceImageDto);
      const enhancedImage = await this.filterService.enhance(
        image.buffer,
        enhanceImageDto.grayscale,
        enhanceImageDto.threshold,
        enhanceImageDto.invert,
        cropOptions
      );

      return enhanceImageDto.toBuffer
        ? enhancedImage.toString('base64')
        : this.filterService.bufferToImage(enhancedImage);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO Externalize + Refactoring.. ?
  // There must be something in the doc :
  // https://github.com/typestack/class-validator
  extractCropOptions = (
    enhanceImageDto: EnhanceImageDto
  ): CropOptions | undefined => {
    if (
      !enhanceImageDto.left &&
      !enhanceImageDto.top &&
      !enhanceImageDto.width &&
      !enhanceImageDto.height
    ) {
      return undefined;
    }

    if (
      enhanceImageDto.left &&
      enhanceImageDto.top &&
      enhanceImageDto.width &&
      enhanceImageDto.height
    ) {
      return {
        left: enhanceImageDto.left,
        top: enhanceImageDto.top,
        width: enhanceImageDto.width,
        height: enhanceImageDto.height,
      };
    }

    if (!enhanceImageDto.left) {
      throw 'The left property is missing in params';
    }

    if (!enhanceImageDto.top) {
      throw 'The top property is missing in params';
    }

    if (!enhanceImageDto.width) {
      throw 'The width property is missing in params';
    }

    if (!enhanceImageDto.height) {
      throw 'The height property is missing in params';
    }
  };
}
