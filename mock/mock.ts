/* eslint-disable @typescript-eslint/no-explicit-any */
import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('/login', 'post', (options: any) => {
  //console.log('Mock 收到的请求体:', options.body)
  const { name, password } = JSON.parse(options.body)
  //console.log('解析后的参数:', name, password)
  if (name === 'adminn' && password === '123456') {
    return {
      code: 1,
      data: {
        id: '1',
        name: 'adminn',
        token: 'eyabcdefg123456ddidbna991d.eyld09-ps0dvjassdd'
      },
      message: '登录成功'
    }
  } else {
    return {
      code: 0,
      data: null,
      message: '用户名或密码错误'
    }
  }
})
