import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'menu' })
export class MenuEntity extends BaseEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @ApiProperty({ type: String, description: '菜单名称' })
  @Column({ type: 'varchar', length: 32, nullable: false, comment: '菜单名称' })
  public name: string;

  @ApiProperty({ type: Number, description: '父级id' })
  @Column({ type: 'int', name: 'parent_id', nullable: false, comment: '父级id' })
  public parentId: number;

  @ApiProperty({ type: String, description: '[菜单类型]: C.目录、M.菜单、B.按钮' })
  @Column({ type: 'varchar', nullable: false, comment: '[菜单类型]: C.目录、M.菜单、B.按钮' })
  public type: string;

  @ApiProperty({ type: String, description: '菜单图标' })
  @Column({ type: 'varchar', nullable: true, comment: '菜单图标' })
  public icon: string;

  @ApiProperty({ type: Number, description: '显示排序'})
  @Column({ type: 'int', nullable: false, comment: '显示排序' })
  public sort: number;

  @ApiProperty({ type: Number, description: '[是否外链]：0.否、1.是' })
  @Column({ type: 'int', name: 'is_frame', nullable: true, comment: '[是否外链]：0.否、1.是' })
  public isFrame?: number;

  @ApiProperty({ type: String, description: '路由地址' })
  @Column({ type: 'varchar', nullable: true, length: 128, comment: '路由地址'})
  public path: string;

  @ApiProperty({ type: String, description: '组件路径' })
  @Column({ type: 'varchar', nullable: true, length: 128, comment: '组件路径' })
  public component: string;

  @ApiProperty({ type: String, description: '权限字符' })
  @Column({ type: 'varchar', nullable: true, length: 128, comment: '权限字符'})
  public perms: string;

  @ApiProperty({ type: String, description: '[显示状态]：0.否、1.是' })
  @Column({ type: 'int', nullable: true, comment: '[显示状态]：0.否、1.是' })
  public visible: number;
  
  @ApiProperty({ type: String, description: '[菜单状态]：0.停用、1.正常' })
  @Column({ type: 'int', nullable: true, comment: '[菜单状态]：0.停用、1.正常' })
  public status: number;

  @ApiProperty({ type: String, description: '[是否缓存]：0.否、1.是' })
  @Column({ type: 'int', name: 'is_cache', nullable: true, comment: '[是否缓存]：0.否、1.是' })
  public isCache: number;
}