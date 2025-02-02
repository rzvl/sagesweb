type TResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}

export type { TResponse }
