import { RestClientApi } from "@utils/types";
import get from "./get";
import create from "./create";
import _delete from "./delete";
import getQrCode from "./get_qr_code";
import list from "./list";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        create: create(restClient),
        delete: _delete(restClient),
        getQrCode: getQrCode(restClient),
        list: list(restClient),
    }
}