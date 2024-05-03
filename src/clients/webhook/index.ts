import { RestClientApi } from "@utils/types";
import create from "./create";
import _delete from "./delete";
import list from "./list";
import handler from "./handler";

export default (restClient: RestClientApi) => {
    return {
        create: create(restClient),
        delete: _delete(restClient),
        handler: handler(restClient),
        list: list(restClient),
    }
}