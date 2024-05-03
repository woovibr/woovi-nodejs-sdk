export const API_BASE_URL: "https://api.woovi.com" = "https://api.woovi.com";
export const API_RETRIES: 2 = 2;
export const API_RETRIE_DELAY: 1000 = 1000; 

export const SDK_VERSION: string = '1.0.0';

export const Headers: {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    USER_AGENT: 'User-Agent',
} = {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    USER_AGENT: 'User-Agent',
};

export const getNodeVersion = (): string => {
    return process.version;
}

export const getNodeArchitecture = (): string => {
    return process.arch;
}

export const getNodePlatform = (): string => {
    return process.platform;
}

export const getUserAgent = (): string => {
    return 'Woovi Node.js SDK v' + SDK_VERSION + ' (node ' + getNodeVersion() + '-' + getNodeArchitecture() + '-' + getNodePlatform() + ')';
}

export default {
    API_BASE_URL,
    API_RETRIES,
    API_RETRIE_DELAY,
    SDK_VERSION,
    Headers,
    getNodeVersion,
    getNodeArchitecture,
    getNodePlatform,
    getUserAgent
}