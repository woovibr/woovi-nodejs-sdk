export type ApiConfig = {
  appId: string;
  baseUrl?: string;
  targetServer?: "production" | "sandbox";
  retries?: number;
};

export interface ApiResponse {
  api_response: ResponseFields;
}

export type ResponseFields = {
  status: number;
  headers: [string, string[]];
};

export type Pagination = {
  skip: number;
  limit: number;
};
