import { RestClientApi } from "@utils/types";
import get from "./get";
import create from "./create";
import list from "./list";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        create: create(restClient),
        list: list(restClient),
    }
}