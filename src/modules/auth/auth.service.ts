import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/common/dto/loginPayload.dto';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { UtilsService } from 'src/shared/services/utils.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private utilsService: UtilsService
  ) { }
  
  /**
   * 登录
   * @param payload 
   * @returns 
   */
  async login(payload: LoginPayload): Promise<any> {
    const { username, password } = payload;

    const user = await this.userService.getUserByUsername(username);

    const comparePassword = this.utilsService.md5(`${password + user.salt}`);

    if (user && user.password === comparePassword) {
      const { password, ...result } = user;
      return {
        access_token: this.jwtService.sign({
          username: user.username,
          sub: user.id
        })
      };
    } else {
      BusinessException.throwBusinessException(ErrorCode.ERR_10004());
    }
  }
}