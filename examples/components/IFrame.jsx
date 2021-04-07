const form_schema = {
  type: 'form',
  mode: 'inline',
  target: 'window',
  title: 'xxx',
  debug:true,
  // controls: [
  //   {
  //     type: 'text',
  //     name: 'keywords',
  //     addOn: {
  //       type: 'submit',
  //       label: '搜索',
  //       level: 'info',
  //       icon: 'fa fa-search pull-left'
  //     }
  //   }
  // ]
};
const iframe_schema = {
  type: 'iframe',
  className: 'b-a',
  src: 'https://www.baidu.com/s?wd=${keywords|raw}',
  height: 500
};

export default {
  aside: '边栏部分',
  title: 'IFrame 可以用来嵌入其他网站',
  body: [
    form_schema,

    iframe_schema
  ]
};
