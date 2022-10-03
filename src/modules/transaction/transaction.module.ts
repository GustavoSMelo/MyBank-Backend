import { forwardRef, Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
    imports: [forwardRef(() => AccountModule), forwardRef(() => UserModule)],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
