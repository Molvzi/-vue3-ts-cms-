/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPageContentConfig {
  pageName: string
  header?: {
    title?: string
    btnTitle?: string
  }
  propsList: any[],
  childrenTree?: any
}

export interface IPageContentProps {
  contentConfig: IPageContentConfig
}
