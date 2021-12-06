import { Body, Controller, Post } from '@nestjs/common';

import { RegexService } from './regex.service';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// TODO : To externalize
class GetResultFromRegexDto {
  message: string;

  @Type(() => Array)
  @IsArray()
  regexs: string[];
}
@Controller()
export class AppController {
  constructor(private readonly regexService: RegexService) {}

  @Post('getResultsFromRegexs')
  getResultsFromRegexs(@Body() getResultFromRegexDto: GetResultFromRegexDto) {
    const results: Record<string, string> = {};

    // TODO : Check what we want to do with the array...
    getResultFromRegexDto.regexs.forEach((regex) => {
      const result = this.regexService.getResultFromRegex(
        getResultFromRegexDto.message,
        regex
      );

      results[regex] = result ? result[0] : null;
    });

    return results;
  }
}
