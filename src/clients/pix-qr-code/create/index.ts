import type { RestClientApi } from "@utils/types";
import type { CreatePayload, CreateResponse } from "./types";
import { validateQrCodePayload } from "@utils/validation";

export default (restClient: RestClientApi) => {
  return (data: CreatePayload) => {
    validateQrCodePayload(data);

    return restClient<CreateResponse>(
      "/api/v1/qrcode-static",
      { method: "POST" },
      data,
    );
  };
};
