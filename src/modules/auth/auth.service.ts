import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';
import { LoginPayload } from 'src/common/dto/loginPayload.dto';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { UtilsService } from 'src/shared/services/utils.service';
import { UserService } from '../user/user.service';
import { ImageCaptchaDto } from 'src/common/dto/imageCaptcha.dto';
import { isEmpty } from 'class-validator';
import { RedisService } from 'src/shared/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
    private redisService: RedisService,
  ) { }

  /**
   * 登录
   * @param payload 
   * @returns 
   */
  async login(payload: LoginPayload): Promise<any> {
    const { username, password, captchaId, captchaCode } = payload;

    const user = await this.userService.getUserByUsername(username);

    const comparePassword = this.utilsService.md5(`${password + user.salt}`);

    if (user && user.password === comparePassword) {
      const { password, salt, ...result } = user;

      await this.checkImageCaptcha(captchaId, captchaCode);

      return {
        access_token: this.jwtService.sign({
          username: user.username,
          sub: user.id
        }),
        user: result
      };
    } else {
      BusinessException.throwBusinessException(ErrorCode.ERR_10004());
    }
  }

  /**
   * 创建验证码并存入 redis，有效期5分钟
   * @param captcha 
   * @returns 
   */
  async createImageCaptcha(captcha: ImageCaptchaDto) {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(captcha.width) ? 100 : captcha.width,
      height: isEmpty(captcha.height) ? 50 : captcha.height,
      charPreset: '1234567890',
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: this.utilsService.generateUUID()
    };
    // 5分钟过期时间
    await this.redisService.set(`admin:captcha:img:${result.id}`, svg.text, 60 * 5);
    return result;
  }

  /**
   * 校验验证码
   * @param id 
   * @param code 
   */
  async checkImageCaptcha(id: string, code: string) {
    const captcha = await this.redisService.get(`admin:captcha:img:${id}`);

    if (!captcha || code.toLowerCase() !== captcha.toLowerCase()) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10008());
    }

    // 校验成功后移除验证码
    await this.redisService.del(`admin:captcha:img:${id}`);
  }
}