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

// 模拟获取用户信息接口
Mock.mock('/users/1', 'get', () => {
  return {
    code: 1,
    data: {
      id: 1,
      name: 'adminn',
      realname: 'John Doe',
      cellphone: '1234567890',
      enable: 1,
      createAt: '2024-01-01T12:00:00Z',
      updateAt: '2024-01-02T12:00:00Z',
      role: {
        id: 1,
        name: 'Admin',
        intro: 'Administrator Role',
        createAt: '2024-01-01T12:00:00Z',
        updateAt: '2024-01-02T12:00:00Z'
      },
      department: {
        id: 1,
        name: 'IT',
        parentId: null,
        createAt: '2024-01-01T12:00:00Z',
        updateAt: '2024-01-02T12:00:00Z',
        leader: 'Alice'
      }
    },
    message: '获取用户信息成功'
  }
})

// 模拟获取用户菜单接口
Mock.mock('/role/1/menu', 'get', () => {
  return {
    code: 0,
    data: [
      {
        id: 38,
        name: '系统总览',
        type: 1,
        url: '/main/anaylysis',
        icon: 'el-icon-monitor',
        sort: 1,
        children: [
          {
            id: 39,
            name: '核心技术',
            type: 2,
            url: '/main/anaylysis/overview',
            sort: 106,
            childern: null,
            parentId: 38
          },
          {
            id: 40,
            name: '商品统计',
            type: 2,
            url: '/main/anaylysis/dashboard',
            sort: 107,
            childern: null,
            parentId: 38
          }
        ]
      },
      {
        id: 1,
        name: '系统管理',
        type: 1,
        url: '/main/system',
        icon: 'el-icon-setting',
        sort: 2,
        children: [
          {
            id: 2,
            name: '用户管理',
            type: 2,
            url: '/main/system/user',
            sort: 100,
            children: [
              {
                id: 5,
                url: null,
                name: '创建用户',
                sort: null,
                type: 3,
                parentId: 2,
                permission: 'system:users:create'
              },
              {
                id: 6,
                url: null,
                name: '删除用户',
                sort: null,
                type: 3,
                parentId: 2,
                permission: 'system:users:delete'
              },
              {
                id: 7,
                url: null,
                name: '修改用户',
                sort: null,
                type: 3,
                parentId: 2,
                permission: 'system:users:update'
              },
              {
                id: 8,
                url: null,
                name: '查询用户',
                sort: null,
                type: 3,
                parentId: 2,
                permission: 'system:users:query'
              }
            ],
            parentId: 1
          },
          {
            id: 3,
            name: '部门管理',
            type: 2,
            url: '/main/system/department',
            sort: 101,
            children: [
              {
                id: 17,
                url: null,
                name: '创建部门',
                sort: null,
                type: 3,
                parentId: 3,
                permission: 'system:department:create'
              },
              {
                id: 18,
                url: null,
                name: '删除部门',
                sort: null,
                type: 3,
                parentId: 3,
                permission: 'system:department:delete'
              },
              {
                id: 19,
                url: null,
                name: '修改部门',
                sort: null,
                type: 3,
                parentId: 3,
                permission: 'system:department:update'
              },
              {
                id: 20,
                url: null,
                name: '查询部门',
                sort: null,
                type: 3,
                parentId: 3,
                permission: 'system:department:query'
              }
            ],
            parentId: 1
          },
          {
            id: 4,
            url: '/main/system/menu',
            name: '菜单管理',
            sort: 103,
            type: 2,
            children: [
              {
                id: 21,
                url: null,
                name: '创建菜单',
                sort: null,
                type: 3,
                parentId: 4,
                permission: 'system:menu:create'
              },
              {
                id: 22,
                url: null,
                name: '删除菜单',
                sort: null,
                type: 3,
                parentId: 4,
                permission: 'system:menu:delete'
              },
              {
                id: 23,
                url: null,
                name: '修改菜单',
                sort: null,
                type: 3,
                parentId: 4,
                permission: 'system:menu:update'
              },
              {
                id: 24,
                url: null,
                name: '查询菜单',
                sort: null,
                type: 3,
                parentId: 4,
                permission: 'system:menu:query'
              }
            ]
          },
          {
            id: 25,
            url: '/main/system/role',
            name: '角色管理',
            sort: 104,
            type: 2,
            children: [
              {
                id: 26,
                url: null,
                name: '创建角色',
                sort: null,
                type: 3,
                parentId: 25,
                permission: 'system:role:create'
              },
              {
                id: 27,
                url: null,
                name: '删除角色',
                sort: null,
                type: 3,
                parentId: 25,
                permission: 'system:role:delete'
              },
              {
                id: 28,
                url: null,
                name: '修改角色',
                sort: null,
                type: 3,
                parentId: 25,
                permission: 'system:role:update'
              },
              {
                id: 29,
                url: null,
                name: '查询角色',
                sort: null,
                type: 3,
                parentId: 25,
                permission: 'system:role:query'
              }
            ]
          }
        ]
      },
      {
        id: 9,
        name: '商品中心',
        type: 1,
        url: '/main/product',
        icon: 'el-icon-shopping-cart',
        sort: 3,
        children: [
          {
            id: 10,
            name: '商品类别',
            type: 2,
            url: '/main/product/list',
            sort: 108,
            children: null,
            parentId: 9
          },
          {
            id: 11,
            name: '商品信息',
            type: 2,
            url: '/main/product/add',
            sort: 109,
            children: null,
            parentId: 9
          }
        ]
      },
      {
        id: 41,
        name: '随便聊聊',
        type: 1,
        url: '/main/chat',
        icon: 'el-icon-chat-dot-square',
        sort: 4,
        children: [
          {
            id: 42,
            name: '聊天室',
            type: 2,
            url: '/main/chat/room',
            sort: 110,
            children: null,
            parentId: 41
          },
          {
            id: 43,
            name: '聊天记录',
            type: 2,
            url: '/main/chat/history',
            sort: 111,
            children: null,
            parentId: 41
          }
        ]
      }
    ]
  }
})
Mock.mock('/role/4/menu', 'get', () => {
  return {
    code: 0,
    data: [
      {
        id: 38,
        name: '系统总览',
        type: 1,
        url: '/main/anaylysis',
        icon: 'el-icon-monitor',
        sort: 1,
        children: [
          {
            id: 39,
            name: '核心技术',
            type: 2,
            url: '/main/anaylysis/overview',
            sort: 106,
            children: null,
            parentId: 38
          },
          {
            id: 40,
            name: '商品统计',
            type: 2,
            url: '/main/anaylysis/dashboard',
            sort: 107,
            children: null,
            parentId: 38
          }
        ]
      }
    ]
  }
})
