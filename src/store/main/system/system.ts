/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deletePageById,
  deleteUsersById,
  editPageData,
  editUserData,
  NewPageData,
  NewUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
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
    },
    async newUserDataAction(userInfo: any) {
      //1.创建新用户
      const newResult = await NewUserData(userInfo)
      console.log(newResult)

      //2.重新获取数据
      this.postUsersListAction({
        offset: 0,
        size: 10
      })
    },
    async editUserDataAction(id: number, userInfo: any) {
      //1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      //2.重新获取数据
      this.postUsersListAction({
        offset: 0,
        size: 10
      })
    },

    // 针对页面的数据,增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newPageResult = await NewPageData(pageName, pageInfo)
      console.log(newPageResult)
      this.postPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editPageResult = await editPageData(pageName, id, pageInfo)
      console.log(editPageResult)
      this.postPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    }
  }
})

export default useSystemStore
