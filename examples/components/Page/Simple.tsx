import {SchemaObject} from '../../../src/schema';

const page_schema: SchemaObject = {
  type: 'page',
  title: '标题',
  remark: {
    title: '标题',
    body:
      '<p>这是一段描述问题，<br/>注意到了没，还可以设置标题。而且只有点击了才弹出来。</p>',
    icon: 'question-mark',
    placement: 'right',
    trigger: 'click',
    rootClose: true
  },
  body:
    '内容部分. 可以<br/>使用 \\${var} 获取<br/>变量。如: `\\$date`: ${date}',
  aside: '边栏部分',
  toolbar: '工具栏',
  initApi: '/api/mock2/page/initData'
};
export default page_schema;
