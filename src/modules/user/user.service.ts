import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BusinessException, ErrorCode } from 'src/common/libs';
import { UserEntity } from 'src/entities/user.entity';
import { UtilsService } from 'src/shared/services/utils.service';
import { EntityManager, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserListDto } from './dto/get-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private utilsService: UtilsService
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
    const user = this.userRepository.findOne({ where: { username } });
    
    return plainToInstance(UserEntity, user, { enableImplicitConversion: true });
  }

  /**
   * 根据 id 查询用户信息
   * @param id 
   * @returns 
   */
  async getUserById(id: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { id } });

    return plainToInstance(UserEntity, user, { enableImplicitConversion: true });
  }

  /**
   * 新增用户
   * @param payload 
   */
  async add(payload: CreateUserDto): Promise<UserEntity | any> {
    const { username, password, confirmPassword, nickname, email, phone } = payload;
    
    if (password !== confirmPassword) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10007());
    }

    const user = await this.getUserByUsername(username);

    if (user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10006());
    }

    await this.entityManager.transaction(async (manager) => {
      const salt = this.utilsService.generateRandomValue(32);

      const pwd = this.utilsService.md5(`${password + salt}`);

      const u = manager.create(UserEntity, {
        username,
        password: pwd,
        nickname,
        email,
        phone,
        salt
      });

      return await this.userRepository.save(u);
    });
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

    const { password, confirmPassword, nickname, email, phone } = payload;

    if (password !== confirmPassword) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10007());
    }

    const pwd = this.utilsService.md5(`${password + user.salt}`);

    if (pwd !== user.password) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10004());
    }

    await this.entityManager.transaction(async (manager) => {
      await manager.update(UserEntity, user.id, {
        username: user.username,
        password: pwd,
        nickname,
        email,
        phone,
        salt: user.salt
      })
    })
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
