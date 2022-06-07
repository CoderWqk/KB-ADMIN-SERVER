import { Inject, Injectable } from '@nestjs/common';
import { Cluster } from 'cluster';
import { Redis } from 'ioredis';
import { REDIS_CLIENT, REDIS_DEFAULT_CLIENT_KEY } from '../redis/redis.constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly clients: Map<string, Redis | Cluster>,
  ) { }

  /**
   * get redis client by name
   * @param name 
   * @returns 
   */
  public getRedis(name = REDIS_DEFAULT_CLIENT_KEY): Redis {
    if (!this.clients.has(name)) {
      throw new Error(`redis client ${name} does not exist`);
    }
    return this.clients.get(name) as Redis;
  }

  /**
   * 根据 key 取值
   * @param key 
   * @returns 
   */
  async get(key: string): Promise<string> {
    if (!key || key === '*') return null;
    return await this.getRedis().get(key);
  }

  /**
   * 设置 key 的值为 val，有效期为（seconds）s
   * @param key 
   * @param val 
   * @param seconds 
   * @returns 
   */
  async set(key: string, val: string, seconds?: number): Promise<'OK' | null> {
    if (!seconds) return await this.getRedis().set(key, val);
    return await this.getRedis().set(key, val, 'EX', seconds);
  }

  /**
   * 根据 keys 删除值
   * @param keys 
   * @returns 
   */
  async del(keys: string | string[]): Promise<number> {
    if (!keys || keys === '*') return 0;
    if (typeof keys === 'string') keys = [keys];
    return await this.getRedis().del(...keys);
  }
}