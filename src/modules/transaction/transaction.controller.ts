import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JWTGuards } from 'src/modules/auth/guards/jwt.guards';
import {
    IBodyTransactionAccount,
    IBodyTransactionAccountDeposit,
    IBodyTransactionDocument,
} from './types/transaction.interface';

@Controller('transaction')
export class TransactionController {
    public constructor(
        private readonly transactionService: TransactionService,
    ) {}

    @Post('document')
    @UseGuards(JWTGuards)
    public transferByDocument(@Body() body: IBodyTransactionDocument) {
        const { idHost, quantity, receiverDocument } = body;

        return this.transactionService.transferByDocument(
            idHost,
            receiverDocument,
            quantity,
        );
    }

    @Post('account')
    @UseGuards(JWTGuards)
    public transferByAccount(@Body() body: IBodyTransactionAccount) {
        const { idHost, quantity, receiverAccountNumber, receiverAgency } =
            body;

        return this.transactionService.transferByAccount(
            idHost,
            receiverAccountNumber,
            receiverAgency,
            quantity,
        );
    }

    @Post('deposit/:id')
    @UseGuards(JWTGuards)
    public depositById(
        @Param('id') id: number,
        @Body('quantity') quantity: number,
    ) {
        return this.transactionService.depositById(id, quantity);
    }

    @Post('deposit/document')
    @UseGuards(JWTGuards)
    public depositByDocument(
        @Body('document') document: string,
        @Body('quantity') quantity: number,
    ) {
        return this.transactionService.depositByDocument(document, quantity);
    }

    @Post('deposit/document')
    @UseGuards(JWTGuards)
    public depositByAccountAndAgency(
        @Body() body: IBodyTransactionAccountDeposit,
    ) {
        const { accountNumber, agency, quantity } = body;
        return this.transactionService.depositByAccountAndAgency(
            accountNumber,
            agency,
            quantity,
        );
    }
}
