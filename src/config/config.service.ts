import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // 读取.env文件，通过dotenv.parse方法形成key-value
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  // 根据key获取value
  get(key: string): any {
    return this.envConfig[key]
  }

  // 可以写方法处理env变量
  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}