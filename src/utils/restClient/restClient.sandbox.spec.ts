import { RestClient } from ".";
import Constants from "@utils/constants";

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

describe("RestClient sandbox behavior", () => {
  test("uses sandbox base URL when targetServer is 'sandbox'", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    const client = RestClient({ appId: "123", targetServer: "sandbox" });

    await client("/test-sandbox");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("woovi-sandbox.com"),
      expect.any(Object),
    );
  });

  test("explicit baseUrl takes precedence over targetServer", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    const client = RestClient({
      appId: "123",
      targetServer: "sandbox",
      baseUrl: "https://example.com/",
    });

    await client("/test-baseurl");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("example.com"),
      expect.any(Object),
    );
  });
});
