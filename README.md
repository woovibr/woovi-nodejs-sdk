# Node SDK

The Node SDK is a toolkit created with the goal of easily integrating OpenPix services into your Node.js applications.

It allows you to create recurring subscriptions, charges, payment requests, webhooks, as well as manage other API data.

You can send custom requests using our client, which adds all necessary information, such as authentication details, and decodes responses in JSON format.

Using our integrated paginator, it's easy to create pagination for data listing. It's supported on all data listing endpoints.

The SDK is officially maintained by OpenPix and distributed via [Npm](https://www.npmjs.com/).

The code is hosted in a [GitHub repository](https://github.com/woovibr/woovi-nodejs-sdk).

Take a look at [how to use it](./docs/usage.md).

## Configuration options

When creating a client with `createClient(config)` the `config` object accepts the following properties:

- `appId` (string) — required. Your application id used as authorization header.
- `baseUrl` (string) — optional. If provided, it will be used as the API base URL (keeps backwards compatibility).
- `targetServer` (`"production" | "sandbox"`) — optional. If set to `"sandbox"` the SDK will use the sandbox API server `https://api.woovi-sandbox.com/`. The default is `"production"`.
- `retries` (number) — optional. Number of retries for network errors (defaults to SDK value).

<<<<<<< HEAD
Note: `baseUrl` takes precedence over `targetServer` when both are provided.
