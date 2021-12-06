import { Injectable } from '@nestjs/common';

@Injectable()
export class RegexService {
  getResultFromRegex = (message: string, regex: string): string[] => {
    const reg = new RegExp(regex);
    return reg.exec(message);
  };
}
