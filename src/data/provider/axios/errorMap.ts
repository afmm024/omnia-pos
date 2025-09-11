import { AxiosError } from "axios"

export interface ErrorResponseData {
    title: string
    data: string,
    erros: string[]
}

export const getError = (error: AxiosError<ErrorResponseData>) => {
    const { response, status } = error
    const { title } = response?.data || {}
    let errorTitle = "Error"
    let errorMessage = `${title}`
    const errorDetail = `${status}: ${title}`

    switch (status) {
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
            errorMessage = errorDetail
            break
    }

    return { errorMessage, errorTitle }
}