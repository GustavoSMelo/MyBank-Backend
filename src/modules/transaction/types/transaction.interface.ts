export interface IBodyTransactionDocument {
    idHost: number;
    receiverDocument: string;
    quantity: number;
}

export interface IBodyTransactionAccount {
    idHost: number;
    receiverAccountNumber: number;
    receiverAgency: number;
    quantity: number;
}

export interface IBodyTransactionAccountDeposit {
    accountNumber: number;
    agency: number;
    quantity: number;
}
