export const BAD_REQUEST = "BAD_REQUEST" // 400
export const UNEXPECTED_ERROR = /Unexpected error/ // 2
export const TOKEN_EXPIRED = /^JWT expired/ // 3
export const EMPTY_TOKEN = /JWT String argument cannot be null or empty/ // 3
export const EDIT_EMPLOYEE_DENIED = /not the employee you want to update/ // 2,3
export const RESET_PWD_INCORRECT = /password are not correct/ // 2,3
export const USED_INGREDIENT_DELETE_ERROR = /this ingredient was used by recipe/ // 2,3

export const UNAUTHORIZED = "UNAUTHORIZED" // 401
export const LOGIN_FAILURE = "LOGIN FAILURE" // 2

export const FORBIDDEN = "FORBIDDEN" //403
export const NEED_AUTHORIZATION = "NEED AUTHORIZATION" // 2

export const CONFLICT = "CONFLICT" // 409
export const ACCOUNT_DUPLICATED = /account/ // 2,3
export const EMAIL_DUPLICATED = /email/ // 2,3
