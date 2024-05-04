
export  interface RestClientConfig {
    queryParams?: Record<string, string | number>;
    retries?: number;
  }


export  type RestClientApi = <T>(
    endpoint: string,
    body?: object,
    config?: RestClientConfig & RequestInit
) => Promise<T> 