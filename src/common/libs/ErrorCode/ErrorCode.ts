export class ErrorCode {
  private code: number;
  private message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static ERR_10001() {
    return { code: -10001, message: '系统错误' };
  }
  public static ERR_10002() {
    return { code: -10002, message: '服务暂停' };
  }
  public static ERR_10003() {
    return { code: -10003, message: '鉴权失败，请重新登陆' };
  }
  public static ERR_10004() {
    return { code: -10004, message: '账户名与密码不匹配，请重新输入' };
  }
  public static ERR_10005() {
    return { code: -10005, message: '数据不存在，操作失败' };
  }
  public static ERR_10006() {
    return { code: -10006, message: '数据已存在，操作失败' };
  }
}