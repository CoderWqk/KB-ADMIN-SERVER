import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 32, comment: '用户名' })
	username: string;

	@Exclude({ toPlainOnly: true }) // 输出屏蔽密码
	@Column({ type: 'varchar', length: 200, comment: '密码' })
	password: string;

	@Column({ type: 'varchar', length: 200, comment: '昵称' })
	nickname: string;

	@Column({ type: 'tinyint', comment: '是否启用(0.否、1.是)' })
	status: number;
}