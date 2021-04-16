import {PlainObject} from '../../../types/amis/lib/types';
import {Plain} from '../../../types/amis/lib/renderers/Plain';

interface IODataQueryOption {
  $filter?: string;
  $orderby?: string;
  $expand?: string;
  $select?: string;

  $skip?: number;
  $top?: number;
  $count?: boolean;
  $search?: string;
  $format?: string;
  $compute?: string;
  $index?: number;
  $fetchXml?: string;
  [key: string]: any;
}

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const noop = () => null;
// 一个 ODataFetcher 只能发送一个请求
export class ODataFetcher {
  public readonly url: URL;
  public readonly headers: Headers;
  public readonly method: TMethod;

  private body_str?: string;

  private readonly onStart: Function = noop; //获取事件，避免频繁改写代码
  private readonly onError: Function = noop;
  private readonly onFinish: Function = noop;
  private readonly onResponse: Function = noop;
  private status: 'preparing' | 'fetching' | 'error' | 'succeeded';
  public resp?: Promise<Response>;

  constructor(url: string, method: TMethod = 'GET', event_hooks: any = {}) {
    this.status = 'preparing';
    this.url = new URL(url);
    this.headers = new Headers({
      'Content-Type': 'application/json'
      // 'OData-MaxVersion': '4.0',
      // 'OData-Version': '4.0'
    });
    this.method = method;
    if (event_hooks.onStart) this.onStart = event_hooks.onStart;
    if (event_hooks.onError) this.onError = event_hooks.onError;
    if (event_hooks.onFinish) this.onFinish = event_hooks.onFinish;
    if (event_hooks.onResponse) this.onResponse = event_hooks.onResponse;
  }

  // 浏览器环境不允许set cookie。会报错Refused to set unsafe header "cookie"
  // public set_header_cookie(cookie: string): void {
  //   this.headers.set('Cookie', cookie);
  // }

  public set_header_Authorization(authorization_value: string): void {
    this.headers.set('Authorization', authorization_value);
  }

  // 配置是否要返回metadata。full会返回navigationLink associationLink odata.type；默认为minimal
  public set_header_accept(metadata_level: 'full' | 'none' | 'minimal'): void {
    this.headers.set('Accept', 'application/json; odata.metadata=' + metadata_level);
  }

  // header中添加include_annotations后，服务端就不会返回304（Not Modified）了，会增加服务器压力
  // *return的作用：
  // 创建或修改资源时，return=representation要求返回完整资源；return=minimal要求返回空body，仅包含header，可以是200、201（Created）、204（No Content）
  // ====
  // *include_annotations的作用是返回这样的数据：
  // ersionnumber@OData.Community.Display.V1.FormattedValue: "2,574,121"
  // _createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname: "systemuser"
  // _createdby_value@OData.Community.Display.V1.FormattedValue: "Shuyu Wu"
  // _fc_dealer_value: "a60eca62-347b-eb11-a812-000d3ac89470"
  // _fc_dealer_value@Microsoft.Dynamics.CRM.associatednavigationproperty: "fc_Dealer"
  // _fc_dealer_value@Microsoft.Dynamics.CRM.lookuplogicalname: "fc_dealer"
  // _fc_dealer_value@OData.Community.Display.V1.FormattedValue: "南京盼达医疗器械有限公司"

  public set_header_prefer(
    return_prefer: 'representation' | 'minimal' | null,
    maxpagesize: number | null,
    include_annotations: '*' | 'OData.Community.Display.V1.FormattedValue' | null
  ): void {
    if (return_prefer) {
      this.headers.append('Prefer', `return=${return_prefer}`);
      //用append，获取时自动变成 comman-separated concatenation，示例：odata.maxpagesize=10, odata.include-annotations="*"
    }
    if (maxpagesize) {
      this.headers.append('Prefer', `odata.maxpagesize=${maxpagesize}`);
    }
    if (include_annotations) {
      this.headers.append('Prefer', `odata.include-annotations="${include_annotations}"`);
    }
  }

  public set_body_obj(body_obj: object): void {
    if (['GET', 'DELETE'].includes(this.method)) {
      throw Error('不允许 setBodyObj');
    }
    this.body_str = JSON.stringify(body_obj);
  }

  public get_plain_headers(): PlainObject {
    const plain_headers: PlainObject = {};
    for (let entry of this.headers) {
      const [key, value] = entry;
      plain_headers[key] = value;
    }
    return plain_headers;
  }

  // 拼装好的url
  public get_target_url(): string {
    const target_url = this.url.href; //URL.href和URL.toString()是相同的，看起来是property，实际上是method call
    return target_url;
  }

  // 执行fetch
  public fetch(): Promise<Response> {
    if (this.status !== 'preparing') {
      throw Error('一个Fecher只能使用一次，如果请求过程出错了，只能重新创建一个Fetcher');
    }
    const request_init: RequestInit = {
      method: this.method,
      headers: this.headers
    };

    if (this.method !== 'GET' && this.body_str) {
      request_init.body = this.body_str;
    }

    return this.try_fetch(this.get_target_url(), request_init);
  }

  // 用try包裹着执行fetch
  private try_fetch(target_url: string, request_init: RequestInit): Promise<Response> {
    try {
      this.onStart(this, target_url, request_init);
      this.status = 'fetching';
      const resp: Promise<Response> = fetch(target_url, request_init);
      this.resp = resp;
      this.status = 'succeeded';
      this.onResponse(this, target_url, request_init, resp);
      return resp;
    } catch (ex) {
      this.status = 'error';
      this.onError(this, ex);
      throw ex;
    } finally {
      this.onFinish(this, target_url, request_init);
    }
  }

  // 添加url上的query options(也叫search params)
  public apply_query(query: IODataQueryOption): void {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (this.url.searchParams.get(key)) {
          this.url.searchParams.set(key, value);
        } else {
          this.url.searchParams.append(key, value);
        }
      }
    }
  }
}
