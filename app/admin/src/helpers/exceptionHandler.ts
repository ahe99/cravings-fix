import { AxiosError } from 'axios'

export const exceptionHandler = (e: unknown) => {
  if (e instanceof AxiosError) {
    console.error(e.response?.data ?? e.response)
    return `Error Code: ${e.code}`
  } else {
    console.error(e)
    return 'Unknown Error'
  }
}
