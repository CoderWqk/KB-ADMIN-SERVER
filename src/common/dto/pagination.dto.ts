import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class Pagination {
    @ApiProperty({
        description: '当前页包含数量',
        required: false,
        default: 10
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly size: number = 10;

    @ApiProperty({
        description: '当前页',
        required: false,
        default: 1
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly current: number = 1;
}