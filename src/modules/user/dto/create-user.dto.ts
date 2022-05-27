import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ description: '是否启用(0.否、1.是)' })
  @IsNumber()
  readonly status: number;
}