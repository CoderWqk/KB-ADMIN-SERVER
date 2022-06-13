import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/libs';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('菜单模块')
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '查询所有菜单信息' })
  @Get('findAll')
  async findAll(): Promise<ApiResult> {
    const menus = await this.menuService.getAll();
    const total = menus.length ? menus.length : 0;
    return ApiResult.SUCCESS(menus, total);
  }

  @ApiOperation({ summary: '根据id查询菜单信息' })
  @Get(':id')
  async getMenuById(@Param('id') id: number): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.menuService.getMenuById(id));
  }

  @ApiOperation({ summary: '新增菜单' })
  @Post()
  @ApiBody({ type: CreateMenuDto })
  async add(@Body() payload: CreateMenuDto): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.menuService.add(payload));
  }

  @ApiOperation({ summary: '修改菜单' })
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'menuId'
  })
  @ApiBody({ type: UpdateMenuDto })
  async update(@Param('id') id: number, @Body() payload: UpdateMenuDto): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.menuService.update(id, payload));
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'menuId'
  })
  async remove(@Param() id: number): Promise<ApiResult> {
    return ApiResult.SUCCESS(await this.menuService.remove(id));
  }
}
