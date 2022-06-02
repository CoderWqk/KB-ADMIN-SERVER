import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}