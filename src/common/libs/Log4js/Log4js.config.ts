import * as path from 'path';
// 日志要写入哪个目录
const baseLogPath = path.resolve(__dirname, '../../../logs');//日志要写入哪个目录

const log4jsConfig = {
  appenders: {
    // 控制打印至控制台
    console: {
      type: 'console',
      layout: {
        type: 'Kb-Admin-Server'
      }
    },
    // 统计日志
    access: {
      // 写入文件格式，并按照日期分类
      type: 'dateFile',
      // 日志文件名，例：access.2022-05-30.log
      filename: `${baseLogPath}/access/access.log`,
      // 是否每个文件都会按照 pattern 命名
      alwaysIncludePattern: true,
      // 日期格式
      pattern: 'yyyyMMdd',
      // 日志大小
      // maxSize: 10485760,
      // 文件保存日期30（天）
      daysToKeep: 30,
      // 日志文件最多存在个数
      numBackups: 3,
      // 是否压缩
      // compress: true,
      // category 分类
      category: 'http',
      // 是否保留文件后缀
      keepFileExt: true,
    },
    // 一些 app 的应用日志
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      pattern: 'yyyyMMdd',
      // maxSize: 10485760,
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true,
    },
    // 异常日志
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      pattern: 'yyyyMMdd',
      // maxSize: 10485760,
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  // 使用 pm2 来管理项目时，打开
  pm2: true,
  // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  pm2InstanceVar: 'INSTANCE_ID'
}

export default log4jsConfig;