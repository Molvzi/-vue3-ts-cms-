/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteUsersById,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      //1.删除数据操作
      const deleteResult = await deleteUsersById(id)
      console.log(deleteResult)

      //2.重新获取数据
      this.postUsersListAction({
        offset: 0,
        size: 10
      })
    }
  }
})

export default useSystemStore
