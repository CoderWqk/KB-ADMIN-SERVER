import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ description: '[所属状态]：1.有效、0.禁用' })
  @IsNumber()
  readonly status: number;
}