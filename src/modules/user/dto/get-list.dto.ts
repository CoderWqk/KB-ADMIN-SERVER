import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/common/dto/pagination.dto";

export class getUserListDto extends Pagination {
  @ApiProperty({ description: '用户名', required: false })
  readonly username?: string;

  @ApiProperty({ description: '昵称', required: false })
  readonly nickname?: string;

  @ApiProperty({ description: '是否启用', required: false })
  readonly status?: number;
}