import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { ApiResult } from 'src/common/libs';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserListDto } from './dto/get-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: '查询所有用户信息' })
  @Get('findAll')
  async findAll(): Promise<ApiResult> {
    const users = await this.userService.getAll();
    const total = users.length ? users.length : 0;
    return ApiResult.SUCCESS(users, total);
  }
  
  @ApiOperation({ summary: '分页查询' })
  @Get('getList')
  async getList(@Query() payload: getUserListDto): Promise<ApiResult> {
    const users = await this.userService.getList(payload);
    
    return ApiResult.SUCCESS(users[0], users[1]);
  }

  @ApiOperation({ summary: '根据id查询用户信息' })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ApiResult> {
    const user = await this.userService.getUserById(id);
    return ApiResult.SUCCESS(instanceToPlain(user));
  }

  @ApiOperation({ summary: '新增用户' })
  @Post()
  @ApiBody({ type: CreateUserDto })
  async add(@Body() payload: CreateUserDto): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.userService.add(payload));
  }

  @ApiOperation({ summary: '修改用户' })
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'userId',
  })
  @ApiBody({ type: CreateUserDto })
  async update(@Param('id') id: number, @Body() payload: UpdateUserDto): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.userService.update(id, payload));
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'userId',
  })
  async remove(@Param('id') id: number): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.userService.remove(id));
  }
}
