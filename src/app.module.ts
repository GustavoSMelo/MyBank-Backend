import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { CardModule } from './modules/card/card.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UtilsModule } from './modules/utils/utils.module';
import { TransactionModule } from './modules/transaction/transaction.module';

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
        UtilsModule,
        UserModule,
        AccountModule,
        CardModule,
        AuthModule,
        TransactionModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
