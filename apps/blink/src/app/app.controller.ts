import { Body, Controller, Post } from '@nestjs/common';

import { RegexService } from './regex.service';
import { IsArray, IsString } from 'class-validator';

// TODO : To externalize
class GetResultFromRegexDto {
  message: string;

  @IsArray()
  @IsString({ each: true })
  regexs: string[];
}

@Controller()
export class AppController {
  constructor(private readonly regexService: RegexService) {}

  @Post('getResultsFromRegexs')
  getResultsFromRegexs(
    @Body() getResultFromRegexDto: GetResultFromRegexDto
  ): Record<string, string[]> {
    const results: Record<string, string[]> = {};

    getResultFromRegexDto.regexs.forEach((regex) => {
      const result = this.regexService.getResultFromRegex(
        getResultFromRegexDto.message,
        regex
      );

      results[regex] = result;
    });

    return results;
  }
}
