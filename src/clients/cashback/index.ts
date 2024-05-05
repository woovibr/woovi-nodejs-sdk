import { RestClientApi } from "@utils/types";
import getOrCreate from "./get-or-create";
import get from "./get";

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    getOrCreate: getOrCreate(restClient),
  };
};
