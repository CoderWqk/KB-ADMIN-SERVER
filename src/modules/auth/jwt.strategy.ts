import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UserService } from '../user/user.service';
import { BusinessException, ErrorCode } from 'src/common/libs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ sub }, done) {
    const user = await this.userService.getUserById(sub);
    if(!user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10003());
    }

    return done(null, user);
  }
}