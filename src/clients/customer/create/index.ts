import { RestClientApi } from "@utils/types";
import { CreateResponse, CustomerPayload } from "./types";

export default (restClient: RestClientApi) => {
  return (data: CustomerPayload) =>
    restClient<CreateResponse>(`/api/v1/customer`, { method: "POST" }, data);
};
