import { Injectable } from "@nestjs/common";
import * as CryptoJS from 'crypto-js';
import { customAlphabet } from "nanoid";

@Injectable()
export class UtilsService {

  /**
   * AES加密
   * @param payload 
   * @param secret 
   * @returns 
   */
  public aesEncrypt(payload: string, secret: string): string {
    return CryptoJS.AES.encrypt(payload, secret).toString();
  }

  /**
   * AES解密
   * @param encrypted 
   * @param secret 
   * @returns 
   */
  public aesDecrypt(encrypted: string, secret: string): string {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  }

  /**
   * MD5加密
   * @param payload 
   * @returns 
   */
  public md5(payload: string): string {
    return CryptoJS.MD5(payload).toString();
  }

  /**
   * 生成一个随机的值
   * @param length 
   * @param placeholder 
   * @returns 
   */
  public generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
}