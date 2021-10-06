import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { get } from 'lodash'

console.log('🚀 ~ file: app.module.ts ~ line 14 ~ get', get(process, 'env.db_host', 'localhost'))
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: get(process, 'env.db_host', 'localhost'),
      port: 5432,
      username: 'hubspace',
      password: 'hubspace',
      database: 'hubspace',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
