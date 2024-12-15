/* eslint-disable @typescript-eslint/no-explicit-any */
import hyRequest from '@/service'

// 用户的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
// 删除用户
export function deleteUsersById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 新增用户
export function NewUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
