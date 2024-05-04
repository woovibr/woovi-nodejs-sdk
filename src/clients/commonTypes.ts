export declare type PageInfo = {
    errors: BasicError[];
    skip: number;
    limit: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export declare type BasicError = {
    message: string;
    data: {
        skip: number;
        limit: number;
    }
}