const tasks_schema = {
  type: 'tasks',
  name: 'tasks',
  btnText:'btnText',
  items: [
    {
      label: 'hive 任务',
      key: 'hive',
      status: 0,
      remark:
        '查看详情<a target="_blank" href="http://www.baidu.com">日志</a>。'
    },
    {
      label: '小流量',
      key: 'partial',
      status: 1
    },
    {
      label: '全量',
      key: 'full',
      status: 2
    }
  ]
};
const tasks_schema2 = {
  type: 'tasks',
  name: 'tasks',
  className: 'b-a bg-white table-responsive m-t',
  checkApi: '/api/mock2/task'
};
export default {
  type:'page',
  $schema: 'https://houtai.baidu.com/v2/schemas/page.json#',
  title: '异步任务',
  body: [
    '<p class="text-danger"></p>',
    tasks_schema,

    tasks_schema2
  ]
};
