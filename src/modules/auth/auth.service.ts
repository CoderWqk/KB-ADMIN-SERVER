import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/common/dto/loginPayload.dto';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  /**
   * 校验用户
   * @param username 
   * @param pass 
   * @returns 
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    } else {
      BusinessException.throwBusinessException(ErrorCode.ERR_10004());
    }

    return null;
  }

  /**
   * 登录
   * @param payload 
   * @returns 
   */
  async login(payload: LoginPayload) {
    const { username } = payload;
    
    const user = await this.userService.getUserByUsername(username);

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id
      })
    };
  }
}