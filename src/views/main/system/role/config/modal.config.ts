const modalConfig = {
  pageName: 'role',
  header:{
    newTitle: '新建角色',
    editTitle: '编辑角色',
  },
  formItems:[
    {type:'input',label:'角色名称',placeholder:'请输入角色名称',model:'name'},
    {type:'input',label:'权限介绍',placeholder:'请输入权限介绍',model:'intro'},
  ]
}

export default modalConfig
