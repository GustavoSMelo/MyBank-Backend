import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/modules/utils/utils.module';
import { CardModule } from '../card/card.module';
import { UserModule } from '../user/user.module';
import { AccountService } from './account.service';
import { Account } from './entity/account.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        CardModule,
        UtilsModule,
        forwardRef(() => UserModule),
    ],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}
