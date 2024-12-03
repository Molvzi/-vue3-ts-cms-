import hyRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  //console.log('即将发送的账号信息:', account);
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id:number){
  return hyRequest.get({
    url:`/role/${id}/menu`
  })
}
