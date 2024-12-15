/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResullt = await getEntireDepartments()

      //保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResullt.data.list
    }
  }
})

export default useMainStore
