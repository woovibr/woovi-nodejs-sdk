import { RestClientApi } from "@utils/types";
import get from "./get";
import create from "./create";
import list from "./list";
import withdraw from "./withdraw";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        create: create(restClient),
        withdraw: withdraw(restClient),
        list: list(restClient),
    }
}