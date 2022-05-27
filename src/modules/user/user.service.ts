import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { UserEntity } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserListDto } from './dto/get-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }


  /**
   * 查询所有用户信息
   * @returns 
   */
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * 分页查询
   * @param payload 
   * @returns 
   */
  async getList(payload: getUserListDto): Promise<UserEntity[]> {
    const { username, nickname, status, size, current } = payload;
    
    return await this.userRepository.find({
      where: {
        username: Like(`%${username || ''}%`),
        nickname: Like(`%${nickname || ''}%`),
        status
      },
      order: { id: 'DESC' },
      skip: size * (current - 1),
      take: size
    });
  }

  /**
   * 根据 username 查询用户信息
   * @param username 
   * @returns 
   */
  async getUserByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * 根据 id 查询用户信息
   * @param id 
   * @returns 
   */
  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * 新增用户
   * @param payload 
   * @returns 
   */
  async add(payload: CreateUserDto): Promise<UserEntity> {
    const { username } = payload;

    const user = await this.getUserByUsername(username);

    if (user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10006());
    }

    return await this.userRepository.save(payload);
  }

  /**
   * 修改用户
   * @param id 
   * @param payload 
   * @returns 
   */
  async update(id: number, payload: UpdateUserDto): Promise<UserEntity | any> {
    const user = await this.getUserById(id);

    if (!user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10005());
    }

    return await this.userRepository.update(id, payload);
  }

  /**
   * 删除用户
   * @param id 
   * @returns 
   */
  async delete(id: number): Promise<UserEntity | any> {
    const user = await this.getUserById(id);

    if (!user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10005());
    }

    return await this.userRepository.delete(id);
  }
}
