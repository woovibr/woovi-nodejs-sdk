import { RestClientApi } from "@utils/types";
import get from "./get";
import create from "./create";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        create: create(restClient),
    }
}