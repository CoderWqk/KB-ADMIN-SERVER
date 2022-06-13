import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名称' })
  @IsString({ message: 'name 类型错误，正确类型 string' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  readonly name: string;

  @ApiProperty({ description: '父级id', default: -1 })
  @IsNumber()
  readonly parentId: number;

  @ApiProperty({ description: '菜单类型' })
  @IsString({ message: 'type 类型错误，正确类型 string' })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  readonly type: string;

  @ApiProperty({ description: '菜单图标', required: false })
  @IsString({ message: 'icon 类型错误，正确类型 string' })
  readonly icon: string;

  @ApiProperty({ description: '显示排序', default: 9999 })
  @IsNumber()
  @IsNotEmpty({ message: '显示排序不能为空' })
  readonly sort: number;

  @ApiProperty({ description: '[是否外链]：0.否、1.是' })
  @IsNumber()
  @IsNotEmpty({ message: '是否外链不能为空' })
  @ValidateIf((o) => o.type !== 'B')
  readonly isFrame: number;

  @ApiProperty({ description: '路由地址' })
  @IsString({ message: 'path 类型错误，正确类型 string' })
  @IsNotEmpty({ message: '路由地址不能为空' })
  @ValidateIf((o) => o.type !== 'B')
  readonly path: string;

  @ApiProperty({ description: '组件路径', required: false })
  @IsString({ message: 'component 类型错误，正确类型 string' })
  @ValidateIf((o) => o.type === 'M')
  readonly component: string;

  @ApiProperty({ description: '权限字符', required: false })
  @IsString({ message: 'perms 类型错误，正确类型 string' })
  @ValidateIf((o) => o.type !== 'C')
  readonly perms: string;

  @ApiProperty({ description: '[显示状态]：0.否、1.是' })
  @IsNumber()
  @IsNotEmpty({ message: '显示状态不能为空' })
  @ValidateIf((o) => o.type !== 'B')
  readonly visible: number;

  @ApiProperty({ description: '[菜单状态]：0.停用、1.正常' })
  @IsNumber()
  @IsNotEmpty({ message: '菜单状态不能为空' })
  @ValidateIf((o) => o.type !== 'B')
  readonly status: number;

  @ApiProperty({ description: '[是否缓存]：0.否、1.是' })
  @IsNumber()
  @IsNotEmpty({ message: '是否缓存不能为空' })
  @ValidateIf((o) => o.type === 'M')
  readonly isCache: number;
}