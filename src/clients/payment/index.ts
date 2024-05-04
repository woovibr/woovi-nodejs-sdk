import { RestClientApi } from "@utils/types";
import get from "./get";
import create from "./create";
import list from "./list";
import approve from "./approve";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        create: create(restClient),
        approve: approve(restClient),
        list: list(restClient),
    }
}