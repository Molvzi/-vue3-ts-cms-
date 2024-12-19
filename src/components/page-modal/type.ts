/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IModalProps {
  modalConfig: IModalConfig
}
