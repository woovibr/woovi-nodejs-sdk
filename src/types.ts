export declare type ApiConfig = {
  appId: string;
};

export declare interface ApiResponse {
  api_response: ResponseFields;
}

export declare type ResponseFields = {
  status: number;
  headers: [string, string[]];
};
