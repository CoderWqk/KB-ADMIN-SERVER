import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '验证码uuid' })
  @IsString()
  captchaId: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  captchaCode: string;
}