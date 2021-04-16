import {RootSchema, SchemaApiObject} from '../../../types/amis/lib';
import {PlainObject} from '../../../types/amis/lib/types';
import {CRUDTableSchem} from '../../../types/amis/lib/renderers/CRUD';
import {TableColumn} from '../../../types/amis/lib/renderers/Table';
import {ActionSchema, ButtonSchema, DialogActionSchema} from '../../../types/amis/lib/renderers/Action';
import {ODataHeadersBuilder} from '../utils/ODataHeadersBuilder.js';
import {fc_contract} from '../types/dataverse/fc_contract';

// 点击新增按钮，弹出一个dialog
const dialog_new_item = {
  title: '新增',
  body: {
    type: 'form',
    name: 'sample-edit-form',
    api: 'post:/api/sample',
    controls: [
      {type: 'text', name: 'engine', label: 'Engine', required: true},
      {type: 'divider'},
      {type: 'text', name: 'browser', label: 'Browser', required: true},
      {type: 'divider'},
      {type: 'text', name: 'platform', label: 'Platform(s)', required: true},
      {type: 'divider'},
      {type: 'text', name: 'version', label: 'Engine version'},
      {type: 'divider'},
      {type: 'text', name: 'grade', label: 'CSS grade'}
    ]
  }
};

function open_detail_page_in_new_window(contractid?: string): void {
  let temp_params = new URLSearchParams();
  if (contractid) {
    temp_params.set('id', contractid);
  }
  temp_params.set('pagetype', 'entityrecord');
  temp_params.set('etn', 'fc_contract');

  const target_hash = temp_params.toString();
  const target_url = new URL(location.href);
  target_url.hash = target_hash;
  window.open(target_url.href);
}

//点击查看后，打开详情页面 ?pagetype=entityrecord&etn=fc_contract&id=ffd8ae17-b67c-eb11-a812-000d3ac89826
const operation_button_detail: ActionSchema | any = {
  type: 'button',
  icon: 'fa fa-eye',
  actionType: 'onClickWithData',
  tooltip: '查看',
  onClickWithData: (data: fc_contract) => {
    const contractid = data.fc_contractid;
    open_detail_page_in_new_window(contractid);
  }
};

const operation_button_edit = {
  type: 'button',
  icon: 'fa fa-pencil',
  tooltip: '编辑',
  actionType: 'drawer',
  drawer: {
    position: 'left',
    size: 'lg',
    title: '编辑',
    body: {
      type: 'form',
      name: 'sample-edit-form',
      api: '/api/sample/$id',
      controls: [
        {type: 'text', name: '_fc_supplier_value', label: 'Engine', required: true},
        {type: 'divider'},
        {type: 'text', name: '_fc_supplier_value', label: 'Browser', required: true},
        {type: 'divider'},
        {type: 'text', name: '_fc_supplier_value', label: 'Platform(s)', required: true},
        {type: 'divider'},
        {type: 'text', name: 'version', label: 'Engine version'},
        {type: 'divider'},
        {type: 'select', name: 'grade', label: 'CSS grade', options: ['A', 'B', 'C', 'D', 'X']}
      ]
    }
  }
};
//合同编号 厂商 经销商 生效日期 截止日期 合同状态
// <grid name="resultset" object="10114" jump="fc_name" select="1" icon="1" preview="1" >
//   <row name="result" id="fc_contractid" >
//     <cell name="fc_name" width="164" />
//     <cell name="fc_supplier" width="100" />
//     <cell name="fc_dealer" width="156" />
//     <cell name="fc_effectivedate" width="100" />
//     <cell name="fc_expirationdate" width="100" />
//     <cell name="fc_htzt" width="100" />
//     <cell name="fc_parent" width="100" />
//   </row>
// </grid>

const table_columns: TableColumn[] = [
  {name: 'fc_name', label: '合同编号', sortable: true, type: 'text', toggled: true, remark: '合同编号'},
  {name: '_fc_supplier_value@OData.Community.Display.V1.FormattedValue', label: '厂商', sortable: true, type: 'text', toggled: true},
  {name: '_fc_dealer_value@OData.Community.Display.V1.FormattedValue', label: '经销商', sortable: true, type: 'text', toggled: true},
  {name: 'fc_effectivedate@OData.Community.Display.V1.FormattedValue', label: '生效日期', sortable: true, type: 'date', toggled: true},
  {name: 'fc_expirationdate@OData.Community.Display.V1.FormattedValue', label: '截止日期', sortable: true, type: 'date', toggled: true},
  {name: 'fc_htzt@OData.Community.Display.V1.FormattedValue', label: '合同状态', sortable: true, type: 'text', toggled: true},
  {type: 'operation', label: '操作', width: 100, buttons: [operation_button_detail, operation_button_edit] as any, toggled: true}
];

const new_button: ActionSchema = {
  type: 'button',
  label: '新增',
  icon: 'fa fa-plus pull-left',
  level: 'primary',
  onClick: (e: any) => {
    open_detail_page_in_new_window(undefined);
    return false; //prevent default
  }
};

const headerToolbar = [
  new_button,
  'filter-toggler', //一个图标，配置filterTogglable:true才会显示
  'bulkActions', //批量操作
  // {type: 'tpl', tpl: '定制内容示例：当前有 ${count} 条数据。', className: 'v-middle'},
  // {type: 'link', href: 'https://www.baidu.com', body: '百度一下', htmlTarget: '_parent', className: 'v-middle'},
  {type: 'columns-toggler', align: 'right'},
  {type: 'drag-toggler', align: 'right'},
  {type: 'pagination', align: 'right'}
];

interface IRequestAdaptor_Data {
  page: number;
  perPage: number;
  items: IODataRecord[];
  original_payload: IODataEntitysetResult;
}

function get_crud_api() {
  const headers = new ODataHeadersBuilder().set_prefer(null, '${perPage}', 'OData.Community.Display.V1.FormattedValue').get_plain_headers();

  const page_to_url_cache: PlainObject = {}; //每次发出request的时候，都记下来，向前翻页的时候直接读取
  function requestAdaptor(api: any, data: IRequestAdaptor_Data, options: any): any {
    if (options.activePage && data.page > options.activePage /*向后翻页*/) {
      api.url = data.original_payload['@odata.nextLink'];
    } else if (options.activePage && data.page < options.activePage /*向前翻页*/) {
      api.url = page_to_url_cache[data.page];
    }
    delete api.data; //避免添加到url上
    page_to_url_cache[data.page] = api.url; //每次发出request的时候，都记下来，向前翻页的时候直接读取
    return api;
  }
  function adaptor(payload: IODataEntitysetResult, response: any, api: any) {
    // adaptor的作用：将odata的payload格式，转为amis要求的格式
    const payload_adapted = {
      status: 0,
      msg: '',
      data: {original_payload: payload}
    };
    if (payload.value) {
      (payload_adapted.data as any).items = payload.value;
    }
    (payload_adapted.data as any).hasNext = !!payload['@odata.nextLink'];

    console.log('payload_adapted', payload_adapted);
    return payload_adapted;
  }

  const crud_api: SchemaApiObject & {requestAdaptor: any; adaptor: any} = {
    method: 'get',
    attachDataToQuery: false, //在requestAdaptor中手动拼接query
    data: {
      // 'nextLink': 'https://dms-dev-v1.crm5.dynamics.com/api/data/v9.2/fc_contracts',
      $count: true //获取总条数
      // '&': '$$'
    },
    // url: '${nextLink}',
    url: 'https://dms-dev-v1.crm5.dynamics.com/api/data/v9.2/fc_contracts?$count=true',
    dataType: 'json',
    headers,
    requestAdaptor,
    adaptor
  };
  return crud_api;
}

const contract_crud_schema: CRUDTableSchem | any = {
  type: 'crud',
  mode: 'table',
  draggable: false, //不需要支持排序
  api: get_crud_api(),
  affixHeader: false, //不固定表头
  perPage: 10, //一页50条记录，会添加到url上 ?perPage=50
  keepItemSelectionOnPageChange: false, //翻页后自动清空选中的条目
  labelTpl: '${id} ${engine}', //选中多条后，每一条都有一个tag，tag的标签由此处控制（用于提供易用的名称）
  // filter: filter,
  filterTogglable: false, //不显示【筛选】按钮
  // bulkActions: bulkActions, //暂时禁掉批量操作。开启后左侧可以勾选
  // quickSaveApi: '/api/sample/bulkUpdate', //quickEdit列会用到，编辑后需要点击按钮才会发送到后端
  // quickSaveItemApi: '/api/sample/$id', //saveImmediately用到，编辑后不需要点击按钮，立即发送到后端
  headerToolbar: headerToolbar,
  footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
  /* rowClassNameExpr: '<%= data.id == 1 ? "bg-success" : "" %>',*/
  columns: table_columns,
  syncLocation: false
};

// toolbar中只有一个按钮：新增
const page_toolbar = [new_button];
const contract_list_schema: RootSchema = {
  type: 'page',
  title: '合同列表',
  // remark: 'bla bla bla',
  toolbar: page_toolbar as any,
  body: contract_crud_schema as any
};
export {contract_list_schema};
