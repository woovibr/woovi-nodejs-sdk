
export type destination = {
    name: string;
    taxID: string;
    pixKey: string;
    bank: string;
    branch: string;
    account: string;
}

export type payment = {
    value: number;
    destinationAlias: string;
    destinationAliasType: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "RANDOM";
    qrCode?: string;
    correlationID: string;
    comment: string;
    status: "CREATED" | "FAILED" | "CONFIRMED" | "DENIED";
    sourceAccountId: string;
}

export type transaction = {
    value: number;
    time: string;
    endToEndId: string;
}