import hyRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  //console.log('即将发送的账号信息:', account);
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
