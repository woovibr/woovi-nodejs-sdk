export type ApiConfig = {
  appId: string;
  baseUrl?: string; // it can be production or sandbox (default to production)
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
