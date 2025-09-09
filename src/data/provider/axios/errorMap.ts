import { AxiosError } from "axios"

export interface ErrorResponseData {
    httpCode: number
    message: string
    code: string | number
}

export const getError = (error: AxiosError<ErrorResponseData>) => {
    const { response } = error
    const { httpCode = 500, message, code } = response?.data || {}

    let errorTitle = "Error"
    let errorMessage = ""
    const errorDetail = `${code}: ${message}`

    switch (httpCode) {
        case 403:
            errorTitle = "Forbidden"
            errorMessage = "Error de servicio"
            break
        case 401:
            errorTitle = "Unauthorized"
            errorMessage = "Error de autenticación"
            break
        case 400:
            errorTitle = "BadRequest"
            errorMessage = "Error de solicitud"
            break
        default:
            errorMessage = "Error desconocido"
            break
    }

    return { httpCode, errorMessage, errorDetail, errorTitle }
}