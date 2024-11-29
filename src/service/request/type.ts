/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"

// 针对AxiosRequestConfig配置进行扩展
export interface HYRequestInterceptors<T = any> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
}
