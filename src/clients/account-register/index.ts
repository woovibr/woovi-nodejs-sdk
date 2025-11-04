import type { RestClientApi } from "@utils/types";
import create from "./create-register";
import get from "./get";
import update from "./update-register";

export default (restClient: RestClientApi) => {
  return {
    create: create(restClient),
    get: get(restClient),
    update: update(restClient),
  };
};
