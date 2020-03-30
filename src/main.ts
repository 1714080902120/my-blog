import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('nestJS-blog') /// 标题
    .setDescription('My Demo Of NestJS And MongoDB') /// 描述
    .setVersion('0.0.1') /// 版本号
    .addTag('nest.js') /// 标签
    .addBearerAuth() // jwt身份验证
    .build()
    // 支持跨域
    app.enableCors()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3001)
}











// 开启
bootstrap()
