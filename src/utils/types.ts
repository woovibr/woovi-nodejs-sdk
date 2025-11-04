export interface RestClientConfig {
  queryParams?: Record<string, string | number>;
  retries?: number;
}

export type RestClientApi = <T>(
  endpoint: string,
  config?: RestClientConfig & RequestInit,
  body?: object,
) => Promise<T>;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
