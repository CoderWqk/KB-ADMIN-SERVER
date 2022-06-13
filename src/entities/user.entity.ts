import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Status } from "src/common/enums/common.enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
	@ApiProperty({ type: Number, description: 'id' })
	@PrimaryGeneratedColumn({ type: 'bigint' })
	public id: number;

	@ApiProperty({ type: String, description: '用户名' })
	@Column({ type: 'varchar', length: 32, nullable: false, comment: '用户名' })
	public username: string;

	@Exclude({ toPlainOnly: true }) // 输出屏蔽密码
	@Column({ type: 'varchar', length: 200, nullable: false, comment: '密码' })
	public password: string;

	@Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '盐' })
  public salt: string;

	@ApiProperty({ type: String, description: '昵称' })
	@Column({ type: 'varchar', default: '', length: 200, nullable: true, comment: '昵称' })
	public nickname: string;

	@ApiProperty({ type: String, description: 'Email' })
	@Column({ type: 'varchar', default: '', length: 200, nullable: true, comment: 'Email' })
	public email: string;

	@ApiProperty({ type: String, description: '手机号' })
  @Column({ type: 'varchar', name: 'phone', default: '', length: 11, comment: '用户手机号码' })
  public phone: string

	@ApiProperty({ type: Number, description: '[所属状态]：0.禁用、1.有效' })
	@Column({ type: 'tinyint', default: Status.NORMAL, comment: '[所属状态]：0.禁用、1.有效' })
	public status: number;
}