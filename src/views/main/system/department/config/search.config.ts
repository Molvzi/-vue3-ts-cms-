const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的部门领导'
    },
    // {
    //   type: 'select',
    //   prop:'enable',
    //   label: '状态',
    //   placeholder: '请选择查询状态',
    //   options: [
    //     { label: '启用', value: 1 },
    //     { label: '禁用', value: 0 }
    //   ]
    // },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
