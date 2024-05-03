import { RestClientApi } from "@utils/types";
import get from "./get";
import list from "./list";
import create_pre_registration from "./create_pre_registration";
import create_application from "./create_application";

export default (restClient: RestClientApi) => {
    return {
        get: get(restClient),
        createPreRegistration: create_pre_registration(restClient),
        createApplication: create_application(restClient),
        list: list(restClient),
    }
}