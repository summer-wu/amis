import type {ButtonControlSchema} from '../../../src/renderers/Form/Button';
import type {TreeControlSchema} from '../../../src/renderers/Form/Tree';
import type {IIRendererStore} from '../../../src/store';
import type {WizardStepSchema} from '../../../src/renderers/Wizard';
import type {IProduct} from '../services/loadProductionLine';
import {get_amis_options, get_all_contract_items_from_tree_field} from '../services/loadProductionLine';

const React = amisRequire('react');

const left_tree_schema: TreeControlSchema | any = {
  type: 'tree',
  label: '勾选授权产品',
  name: 'tree',
  multiple: true, //支持多选，多选时左边会出现 正方形，可以勾选；单选的话没有正方形，点击后背景高亮
  joinValues: false,
  options: get_amis_options(),
  initiallyOpen: false
};

const right_table_schema = {
  style: {flex: 1},
  type: 'table',
  source: '${contract_items}',
  name: 'contract_items',
  columnsTogglable: false, //不允许隐藏列
  label: '授权产品',
  columns: [
    {label: '产品编号', name: 'productCode'},
    {label: '产品名称', name: 'productName'},
    {label: '产品规格', name: 'format'},
    {label: '标准价格', name: 'standardPrice'},
    {label: '协议价格', name: 'negotiatedPrice'},
    {label: '可用实物返利', name: 'rebateFlag'},
    {label: '遵循价格手册', name: 'byBookPrice'}
  ]
};

const arrow_btn_schema: ButtonControlSchema | any = {
  type: 'button',
  wrap: false,
  label: '→',
  level: 'primary',
  inputClassName: 'height-auto arrow-btn',
  onClick: (e: any, props: any) => {
    // data是form中的数据，继承自wizard。点击按钮后，会调用onChange，更改form中的值
    const tree_field_selected_products: Array<IProduct> = props.data?.tree;
    const contract_items = get_all_contract_items_from_tree_field(tree_field_selected_products);
    props.onBulkChange({contract_items});
  }
};

interface IContractStep2FlexboxProps {
  $path: string;
  store: IIRendererStore;
  renderFormItems: (schema: any, region: string, otherProps: any) => any;
}

// 合同的第二部，添加产品
// 仿照 renderers/Form/HBox 写的。只是配置布局和样式
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

const contract_detail_step2_schema: WizardStepSchema = {
  title: '授权产品',
  debug: true,
  // initApi:undefined,
  controls: [
    {
      type: 'ContractStep2AddProductFlexbox',
      component: ContractStep2AddProductFlexbox
    } as any
  ]
};
export {contract_detail_step2_schema};
