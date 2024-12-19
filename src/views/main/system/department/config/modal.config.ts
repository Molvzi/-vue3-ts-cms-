const modalConfig = {
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: [
        {
          label: '顶级部门',
          value: 0
        },
        {
          label: '二级部门',
          value: 1
        }
      ]
    }
  ]
}

export default modalConfig
