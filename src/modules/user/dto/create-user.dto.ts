import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/common/enums/common.enums';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: 'username 类型错误，正确类型 string' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  password: string;

  @ApiProperty({ description: '确认密码' })
  @IsString({ message: ' confirmPassword 类型错误，正确类型 string' })
  confirmPassword: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsString({ message: 'phone 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({ description: '[所属状态]：1.有效、0.禁用', default: Status.NORMAL })
  @IsNumber()
  readonly status: number;
}