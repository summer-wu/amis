import {RootSchema, SchemaApiObject} from '../../../types/amis/lib';
import {PlainObject} from '../../../types/amis/lib/types';
import {CRUDTableSchem} from '../../../types/amis/lib/renderers/CRUD';
import {TableColumn} from '../../../types/amis/lib/renderers/Table';
import {ActionSchema, ButtonSchema, DialogActionSchema} from '../../../types/amis/lib/renderers/Action';
import {ODataHeadersBuilder} from '../utils/ODataHeadersBuilder.js';
import {WizardSchema, WizardStepSchema} from '../../../types/amis/lib/renderers/Wizard';
import {FileControlSchema} from '../../../types/amis/lib/renderers/Form/File';
import {get_hash_param_with_key, get_url_param_with_key} from '../utils/url_util.js';
import {contract_detail_step2_schema} from './contract_detail_step2_schema.js';

const React = amisRequire('react');

function get_step1_initApi(): undefined | object {
  const contractid = get_hash_param_with_key(location.hash, 'id');
  if (!contractid) {
    return undefined;
  }

  const headers = new ODataHeadersBuilder().set_prefer(null, null, 'OData.Community.Display.V1.FormattedValue').get_plain_headers();

  function adaptor(payload: IODataEntitysetResult, response: any, api: any) {
    // adaptor的作用：将odata的payload格式，转为amis要求的格式
    const payload_adapted = {
      status: 0,
      msg: '',
      data: payload
    };
    console.log('payload_adapted', payload_adapted);
    return payload_adapted;
  }

  const step1_initApi: SchemaApiObject & {adaptor: any} = {
    method: 'get',
    attachDataToQuery: false, //用template
    url: `https://dms-dev-v1.crm5.dynamics.com/api/data/v9.2/fc_contracts(${contractid})`,
    dataType: 'json',
    headers,
    adaptor
  };
  return step1_initApi;
}

//  {name: '_fc_supplier_value@OData.Community.Display.V1.FormattedValue', label: '厂商', sortable: true, type: 'text', toggled: true},
//   {name: '_fc_dealer_value@OData.Community.Display.V1.FormattedValue', label: '经销商', sortable: true, type: 'text', toggled: true},
//   {name: 'fc_effectivedate@OData.Community.Display.V1.FormattedValue', label: '生效日期', sortable: true, type: 'date', toggled: true},
//   {name: 'fc_expirationdate@OData.Community.Display.V1.FormattedValue', label: '截止日期', sortable: true, type: 'date', toggled: true},
//   {name: 'fc_htzt@OData.Community.Display.V1.FormattedValue', label: '合同状态', sortable: true, type: 'text', toggled: true},
const step1: WizardStepSchema = {
  debug:true,
  title: '基本信息',
  initApi: get_step1_initApi() as any,
  controls: [
    {label: '合同编码', type: 'text', name: 'fc_name', disabled: true},
    {
      type: 'text',
      label: '厂商',
      name: '_fc_supplier_value@OData.Community.Display.V1.FormattedValue',
      disabled: true
    },
    {
      type: 'select',
      label: '经销商',
      name: '_fc_dealer_value@OData.Community.Display.V1.FormattedValue',
      disabled: true
    },
    {type: 'date', label: '生效日期', name: 'fc_effectivedate@OData.Community.Display.V1.FormattedValue', disabled: true},
    {type: 'date', label: '截止日期', name: 'fc_expirationdate@OData.Community.Display.V1.FormattedValue', disabled: true},
    {
      type: 'text',
      label: '合同状态',
      name: 'fc_htzt@OData.Community.Display.V1.FormattedValue',
      disabled: true
    },
    {type: 'text', label: '注释', name: 'fc_comment', disabled: true},
    {type: 'file', label: '合同影印件或相关记录', name: 'fc_he_tong_ying_yin_jian_name', disabled: true} as FileControlSchema
  ],
  mode: 'horizontal'
};

const step3 = {
  title: '授权终端',
  controls: ['这是最后一步了']
};

const wizard_schema: WizardSchema = {
  type: 'wizard',
  mode: 'horizontal',
  steps: [step1, contract_detail_step2_schema, step3] as any
};
// toolbar中只有一个按钮：新增
const page_toolbar: any = [];
const contract_detail_schema: RootSchema = {
  type: 'page',
  title: '合同详情',
  // remark: 'bla bla bla',
  toolbar: page_toolbar as any,
  body: wizard_schema as any
};
export {contract_detail_schema};
