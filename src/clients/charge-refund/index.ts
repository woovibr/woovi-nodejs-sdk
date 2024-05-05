import { RestClientApi } from "@utils/types";
import list from "./list";
import create from "./create";

export default (restClient: RestClientApi) => {
  return {
    list: list(restClient),
    create: create(restClient),
  };
};
