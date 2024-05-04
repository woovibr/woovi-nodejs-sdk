
export declare interface RestClientConfig {
    queryParams?: Record<string, string | number>;
    retries?: number;
  }


export declare type RestClientApi = <T>(
    endpoint: string,
    body?: object,
    config?: RestClientConfig & RequestInit
) => Promise<T> 