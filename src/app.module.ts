import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            synchronize: false,
            entities: ['dist/**/*.entity.js'],
            migrations: ['dist/migrations/*.js'],
        }),
        UserModule,
        AccountModule,
    ],
})
export class AppModule {}
