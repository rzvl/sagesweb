export type TResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}
