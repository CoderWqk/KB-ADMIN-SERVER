import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({ type: 'timestamp', name: 'create_at', comment: '创建时间' })
  public createAt: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({ type: 'timestamp', name: 'update_at', comment: '更新时间' })
  public updateAt: Date;
}