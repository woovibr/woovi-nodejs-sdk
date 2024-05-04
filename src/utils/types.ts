
export  interface RestClientConfig {
    queryParams?: Record<string, string | number>;
    retries?: number;
  }

export  type RestClientApi = <T>(
    endpoint: string,
    config?: RestClientConfig & RequestInit,
    body?: object
) => Promise<T> 