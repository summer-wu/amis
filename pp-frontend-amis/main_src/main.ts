// main是入口点，代码会立即执行。代码执行的效果是将amis schema挂载到dom上

import {add} from './add_module';
console.log('add(1,2)', add(1, 2));
//
// const amisLib = amisRequire('amis');
// (window as any).amisLib = amisLib;
//
// import {IEmbedModule, IEmbedEnv} from '../../types/amis/examples/embed';
// import {test_page_schema} from './entry_schemas/test_page_schema.js';
// import {test_page_schema2} from './entry_schemas/test_page_schema2.js';
// import {contract_list_schema} from './entry_schemas/contract_list_schema.js';
// import {contract_detail_schema} from './entry_schemas/contract_detail_schema.js';
// import {get_hash_param_with_key} from './utils/url_util.js';
//
// function get_schema_for_current_url(): object {
//   const etn = get_hash_param_with_key(location.hash, 'etn');
//   const pagetype = get_hash_param_with_key(location.hash, 'pagetype');
//   if (etn === 'fc_contract' && pagetype === 'entityrecord') {
//     //http://localhost:8101/main.html?pagetype=entityrecord&etn=fc_contract&id=ffd8ae17-b67c-eb11-a812-000d3ac89826
//     return contract_detail_schema;
//   } else {
//     return contract_list_schema;
//   }
// }
//
// // 传入schema，schema应该是一个object
// function mount_amis_to_dom(schema: object): void {
//   const amis_embed_module: IEmbedModule = amisRequire('amis/embed');
//
//   const props = {}; //总是传入空object
//   const env: IEmbedEnv = {
//     responseAdpater(api: any, response: any, query: any, request: any): any {
//       console.log('responseAdpater', {api, response, query, request});
//       return response;
//     },
//     // embed.ts中的updateLocation会重新加载网页，改为仅修改hash，不加载网页
//     updateLocation: (to: any, replace: boolean) => {
//       console.log(`updateLocation to:${to} replace:${replace}`);
//       window.history.replaceState('', document.title, `#${to}`);
//     }
//   };
//   const scopedComponent = amis_embed_module.embed('#root', schema, props, env);
//   console.log('scopedComponent', scopedComponent);
// }
//
// const schema = get_schema_for_current_url();
// mount_amis_to_dom(schema);
// // mount_amis_to_dom(test_page_schema);
// // mount_amis_to_dom(test_page_schema2);
