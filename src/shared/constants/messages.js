export const UNEXPECTED_ERROR = "Unexpected error" // BAD_REQUEST 400 多個
export const LOGIN_FAILURE = "LOGIN FAILURE" // status:UNAUTHORIZED 401
export const NEED_AUTHORIZATION = "NEED AUTHORIZATION" // FORBIDDEN 403
export const ACCOUNT_DUPLICATED = "ACCOUNT DUPLICATED" // CONFLICT 409

// UNEXPECTED_ERROR 可用debugMessage區分為以下情造成
export const TOKEN_EXPIRED = /^JWT expired/
export const EMPTY_TOKEN = /JWT String argument cannot be null or empty/