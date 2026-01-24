// import { apiWithLog } from '@woovi/apiwithlog'
import Constants from "@utils/constants";

import type { ApiConfig } from "@src/types";
import type { RestClientConfig } from "@utils/types";

const RestClient = (clientConfig: ApiConfig) => {
  function appendQueryParamsToUrl(
    url: string,
    queryParams?: Record<string, string | number>,
  ): string {
    if (!queryParams) return url;

    const searchParams = new URLSearchParams(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)]));

    return url.includes("?")
      ? `${url}&${searchParams.toString()}`
      : `${url}?${searchParams.toString()}`;
  }

  function retryWithExponentialBackoff<T>(
    fn: () => Promise<T>,
    retries: number,
  ): Promise<T> {
    let attempt = 1;

    const execute: () => Promise<T> = async () => {
      try {
        return await fn();
      } catch (error: unknown) {
        if (attempt >= retries || (error as { status: number }).status < 500) {
          throw error;
        }

        const delayMs = Constants.API_RETRIE_DELAY * 2 ** attempt;
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        attempt++;
        return execute();
      }
    };

    return execute();
  }

  async function fetcher<T>(
    endpoint: string,
    config?: RestClientConfig & RequestInit,
    body?: object,
  ): Promise<T> {
    const {
      queryParams,
      method = "GET",
      retries = Constants.API_RETRIES,
      ...customConfig
    } = config || {};

    const url = appendQueryParamsToUrl(
      `${clientConfig.baseUrl ?? Constants.API_BASE_URL}${endpoint}`,
      queryParams,
    );
    if (body) customConfig.body = JSON.stringify(body);

    const headers = Object.assign({}, customConfig.headers, {
      [Constants.Headers.CONTENT_TYPE]: "application/json",
      [Constants.Headers.USER_AGENT]: Constants.getUserAgent(),
      [Constants.Headers.AUTHORIZATION]: clientConfig.appId,
    });

    let response: Response;

    const fetchFn = async () => {
      response = await fetch(
        url,
        Object.assign(
          {},
          {
            ...customConfig,
            method,
          },
          { headers },
        ),
      );

      if (response.ok) {
        const data = await response.json();

        return data as T;
      }

      throw await response.json();
    };

    return await retryWithExponentialBackoff(fetchFn, clientConfig.retries || retries);
  }

  return fetcher;
};

function objectToQueryString(obj: {
  [key: string]: string | number | boolean;
}): string {
  return new URLSearchParams(
  	Object.entries(obj).map(([key, value]) => [key, String(value)]))
    .toString();
}

export { RestClient, objectToQueryString };
