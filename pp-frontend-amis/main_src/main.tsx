import type {IEmbedModule, IEmbedEnv} from './types/amis/examples/embed';
import {test_page_schema} from './entry_schemas/test_page_schema';
import {test_page_schema2} from './entry_schemas/test_page_schema2';
import {contract_list_schema} from './entry_schemas/contract_list_schema';
import {contract_detail_schema} from './entry_schemas/contract_detail_schema';
import {get_hash_param_with_key} from './utils/url_util';
import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import {render as renderAmis, ToastComponent, AlertComponent} from '../../src';
import {alert, confirm} from '../../src/components/Alert';
import {toast} from '../../src/components/Toast';
import {fetcherConfig} from '../../src/factory';
import {fetcherResult} from '../../src/types';
import {add} from './add_module';
console.log('add(1,2)', add(1, 2));

const theme = 'default';

// 不同的url有不同的schema，目前有列表页、详情页。默认是列表页
function get_schema_for_current_url(): object {
  const etn = get_hash_param_with_key(location.hash, 'etn');
  const pagetype = get_hash_param_with_key(location.hash, 'pagetype');
  if (etn === 'fc_contract' && pagetype === 'entityrecord') {
    //http://localhost:8101/main.html#pagetype=entityrecord&etn=fc_contract&id=ffd8ae17-b67c-eb11-a812-000d3ac89826
    return contract_detail_schema;
  } else {
    return contract_list_schema;
  }
}

const attachmentAdpator = (response: any) => {
  if (response && response.headers && response.headers['content-disposition']) {
    const disposition = response.headers['content-disposition'];
    let filename = '';
    if (disposition && disposition.indexOf('attachment') !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i;
      let matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }

      // 很可能是中文被 url-encode 了
      if (filename && filename.replace(/[^%]/g, '').length > 2) {
        filename = decodeURIComponent(filename);
      }

      let type = response.headers['content-type'];
      let blob = response.data.toString() === '[object Blob]' ? response.data : new Blob([response.data], {type: type});
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
      } else {
        let URL = window.URL || (window as any).webkitURL;
        let downloadUrl = URL.createObjectURL(blob);
        if (filename) {
          // use HTML5 a[download] attribute to specify filename
          let a = document.createElement('a');
          // safari doesn't support this yet
          if (typeof a.download === 'undefined') {
            (window as any).location = downloadUrl;
          } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
          }
        } else {
          (window as any).location = downloadUrl;
        }
        setTimeout(function () {
          URL.revokeObjectURL(downloadUrl);
        }, 100); // cleanup
      }

      return {
        ...response,
        data: {
          status: 0,
          msg: '文件即将开始下载。。'
        }
      };
    }
  } else if (response.data.toString() === '[object Blob]') {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener('loadend', e => {
        const text = reader.result as string;

        try {
          resolve({
            ...response,
            data: {
              ...JSON.parse(text)
            }
          });
        } catch (e) {
          reject(e);
        }
      });

      reader.readAsText(response.data);
    });
  }

  return response;
};
const responseAdpater = (api: any) => (value: any) => {
  let response = value.data;

  if (response.hasOwnProperty('errno')) {
    response.status = response.errno;
    response.msg = response.errmsg;
  } else if (response.hasOwnProperty('no')) {
    response.status = response.no;
    response.msg = response.error;
  }

  const result = {
    ...value,
    data: response
  };
  return result;
};

// 入口组件
class App extends React.Component<any, any> {
  scoped_context: any;
  constructor(props: any) {
    super(props);
    this.scoped_context = null;
    this.fetcher = this.fetcher.bind(this);
  }

  get_schema(): object {
    return contract_detail_schema;
    // return {
    //   // 这里是 amis 的 Json 配置。
    //   type: 'page',
    //   title: '简单页面',
    //   body: '内容'
    // };
  }

  // fetcher的参数也叫 api object
  fetcher(fetcherConfig0: fetcherConfig): Promise<fetcherResult> {
    const {
      url, // 接口地址
      method, // 请求方法 get、post、put、delete
      responseType,
      headers // 请求头
    } = fetcherConfig0 as any;
    let data = fetcherConfig0.data; // 请求数据
    const config = fetcherConfig0.config || {}; //其他配置
    config.withCredentials = true; //当跨域时可能有点问题
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new (axios as any).CancelToken(config.cancelExecutor);
    }

    config.headers = headers || {};
    config.method = method;

    if (method === 'get' && data) {
      config.params = data;
    } else if (data && data instanceof FormData) {
      // config.headers['Content-Type'] = 'multipart/form-data';
    } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
      data = JSON.stringify(data);
      config.headers['Content-Type'] = 'application/json';
    }

    data && (config.data = data);

    return axios(url, config).then(attachmentAdpator).then(responseAdpater(fetcherConfig0));
  }

  render_amis_element() {
    const schema = this.get_schema();
    const props = {
      theme: 'default',
      locale: 'zh-CN',
      scopeRef: (ref: any) => (this.scoped_context = ref)
    };

    //options这个变量，文档中也叫env
    const options = {
      // 下面三个接口必须实现
      fetcher: this.fetcher,
      isCancel: (value: any) => (axios as any).isCancel(value),
      copy: (contents: string, options: any = {}) => {
        const ret = copy(contents, options);
        ret && options.shutup !== true && toast.info('内容已拷贝到剪切板');
        return ret;
      },
      theme,
      responseAdpater(api: any, response: any, query: any, request: any): any {
        console.log('responseAdpater', {api, response, query, request});
        return response;
      },
      // embed.ts中的updateLocation会重新加载网页，改为仅修改hash，不加载网页
      updateLocation: (to: any, replace: boolean) => {
        console.log(`updateLocation to:${to} replace:${replace}`);
        window.history.replaceState('', document.title, `#${to}`);
      }
      //jumpTo，在factory.tsx中提供了默认配置
      //alert confirm notify，在factory.tsx中提供了默认配置
      //isCurrentUrl，在factory.tsx中提供了默认配置
    };
    const amis_element: JSX.Element = renderAmis(schema as any, props, options);
    return amis_element;
  }

  render() {
    return (
      <div className="amis-scope">
        <p>通过 amis 渲染页面0</p>
        <ToastComponent theme={theme} key="toast" position={'top-right'} closeButton={false} timeout={5000} />
        {/*container最终会传入react-overlays*/}
        <AlertComponent theme={theme} key="alert" container={document.body} />
        {this.render_amis_element()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
