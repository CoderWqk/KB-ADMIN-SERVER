import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { MenuEntity } from 'src/entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>
  ) { }

  /**
   * 查询所有菜单信息
   * @returns 
   */
  async getAll(): Promise<MenuEntity[]> {
    return await this.menuRepository.find();
  }

  /**
   * 根据 id 查询菜单信息
   * @returns 
   */
  async getMenuById(id: number): Promise<MenuEntity> {
    const menu = await this.menuRepository.findOne({ where: { id } })
    return menu;
  }

  /**
   * 新增菜单
   * @param payload 
   * @returns 
   */
  async add(payload: CreateMenuDto): Promise<MenuEntity | any> {
    return await this.menuRepository.save(payload);
  }

  /**
   * 修改菜单
   * @param id 
   * @param payload 
   * @returns 
   */
  async update(id: number, payload: UpdateMenuDto): Promise<MenuEntity | any> {
    const menu = await this.getMenuById(id);

    if (!menu) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10005());
    }

    return await this.menuRepository.save(payload);
  }

  /**
   * 删除菜单
   * @param id 
   * @returns 
   */
  async remove(id: number): Promise<MenuEntity | any> {
    const menu = await this.getMenuById(id);

    if (!menu) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10005());
    }

    return await this.menuRepository.delete(id);
  }
}
