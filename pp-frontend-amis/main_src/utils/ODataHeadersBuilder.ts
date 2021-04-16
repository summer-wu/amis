import {PlainObject} from '../../../types/amis/lib/types';

export class ODataHeadersBuilder {
  private readonly headers: Headers;

  constructor() {
    this.headers = new Headers({
      'Content-Type': 'application/json'
      // 'OData-MaxVersion': '4.0',
      // 'OData-Version': '4.0'
    });
  }

  public set_Authorization(authorization_value: string): ODataHeadersBuilder {
    this.headers.set('Authorization', authorization_value);
    return this;
  }

  // 配置是否要返回metadata。full会返回navigationLink associationLink odata.type；默认为minimal
  public set_accept_metadata_level(metadata_level: 'full' | 'none' | 'minimal'): ODataHeadersBuilder {
    this.headers.set('Accept', 'application/json; odata.metadata=' + metadata_level);
    return this;
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

  public set_prefer(
    return_prefer: 'representation' | 'minimal' | null,
    maxpagesize: number | null | string,
    include_annotations: '*' | 'OData.Community.Display.V1.FormattedValue' | null
  ): ODataHeadersBuilder {
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
    return this;
  }

  public get_plain_headers(): PlainObject {
    const plain_headers: PlainObject = {};
    for (let entry of this.headers) {
      const [key, value] = entry;
      plain_headers[key] = value;
    }
    return plain_headers;
  }
}
