import type {IIRendererStore} from '../../../types/amis/lib/store';
import type {ButtonControlSchema} from '../../../types/amis/lib/renderers/Form/Button';
const React = amisRequire('react');

const left_tree_schema = {
  type: 'tree',
  label: '勾选授权产品',
  name: 'tree',
  options: [
    {
      label: '选项A',
      value: 'A',
      children: [
        {label: '选项C', value: 'C'},
        {label: '选项D', value: 'D'}
      ]
    },
    {label: '选项B', value: 'B'}
  ]
};

const right_table_schema = {
  style: {flex: 1},
  type: 'table',
  name: 'table',
  label: '授权产品',
  columns: [
    {label: '产品编号', name: 'color'},
    {label: '产品名称', name: 'name'},
    {label: '产品规格', name: 'name'},
    {label: '标准价格', name: 'name'},
    {label: '协议价格', name: 'name'},
    {label: '可用实物返利', name: 'name'},
    {label: '遵循价格手册', name: 'name'}
  ]
};

const arrow_btn_schema: ButtonControlSchema = {
  type: 'button',
  wrap: false,
  label: '→',
  level: 'primary',
  actionType: 'dialog',
  inputClassName: 'height-auto arrow-btn',
  dialog: {
    title: '系统提示',
    body: '对你点击了'
  }
};

interface IContractStep2FlexboxProps {
  $path: string;
  store: IIRendererStore;
  renderFormItems: (schema: any, region: string, otherProps: any) => any;
}

// 合同的第二部，添加产品
// 仿照 renderers/Form/HBox
function ContractStep2AddProductFlexbox(props: IContractStep2FlexboxProps) {
  const outerStyle: any = {display: 'flex', flexDirection: 'row', justify: 'flex-start', alignItems: 'stretch'};
  const region = (props.$path as string).replace(/^.*form\//, '');
  const left_tree_elem = props.renderFormItems({controls: [left_tree_schema]}, region, {});
  const center_btn_elem = props.renderFormItems({controls: [arrow_btn_schema]}, region, {});
  const right_table_elem = props.renderFormItems({controls: [right_table_schema]}, region, {});
  const right_table_elem_wrapped = <div style={{flex: 1}}>{right_table_elem}</div>;
  const elems = [left_tree_elem, center_btn_elem, right_table_elem_wrapped];
  return <div style={outerStyle}>{elems}</div>;
}

// function ContractStep2AddProductFlexbox(props: IContractStep2FlexboxProps) {
//   return <div>123</div>
// }

// const test_page_schema = {
//   type: 'page',
//   body: {
//     type: '',
//     itemActions:[
//       {type:'button',label:'123123'}
//     ],
//     api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample?waitSeconds=1',
//     columns: [
//       {
//         name: 'id',
//         label: 'ID'
//       },
//       {
//         name: 'engine',
//         label: 'Rendering engine',
//         popOver: {
//           body: {
//             type: 'tpl',
//             tpl: '${engine}'
//           }
//         }
//       }
//     ]
//   }
// };

const test_page_schema = {
  type: 'page',
  body: {
    type: 'service',
    api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample?perPage=5',
    body: [
      {
        type: 'table',
        itemActions: [
          {type: 'button', label: 'itemAction0'},
          {type: 'button', label: 'itemAction2'},
          {type: 'plain', text: 'text0'}
        ],
        title: '表格1',
        source: '$rows',
        columns: [
          {
            name: 'engine',
            label: 'Engine'
          },
          {
            name: 'version',
            label: 'Version'
            // popOver: {
            //   body: {
            //     type: 'tpl',
            //     tpl: '${engine}'
            //   }
            // }
          },

          {
            type: 'operation',
            body: [{type: 'button', label: 'itemAction0'}],
            buttons: [
              {type: 'button', label: 'itemAction0'},
              {type: 'button', label: 'itemAction2'}
            ]
          }
        ]
      }
    ]
  }
};

console.log('test_page_schema:\n', JSON.stringify(test_page_schema, null, 2));
export {test_page_schema};
