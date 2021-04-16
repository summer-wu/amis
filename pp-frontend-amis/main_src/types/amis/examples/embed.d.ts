// 对应于 amis/examples/embed.tsx
type IScopedContext = any;

// js sdk总是传递空object就行
interface IEmbedProps {
}

// env可以覆盖RenderOptions
interface RenderOptions {
  session?: string;
  fetcher?: (config: fetcherConfig) => Promise<fetcherResult>;
  wsFetcher?: (ws: string, onMessage: (data: any) => void, onError: (error: any) => void) => void;
  isCancel?: (value: any) => boolean;
  notify?: (
    type: 'error' | 'success',
    msg: string,
    conf?: {
      closeButton?: boolean;
      timeout?: number;
    }
  ) => void;
  jumpTo?: (to: string, action?: Action, ctx?: object) => void;
  alert?: (msg: string) => void;
  confirm?: (msg: string, title?: string) => boolean | Promise<boolean>;
  rendererResolver?: (path: string, schema: Schema, props: any) => null | RendererConfig;
  copy?: (contents: string) => void;
  getModalContainer?: () => HTMLElement;
  loadRenderer?: (
    schema: Schema,
    path: string,
    reRender: Function
  ) => Promise<React.ReactType> | React.ReactType | JSX.Element | void;
  affixOffsetTop?: number;
  affixOffsetBottom?: number;
  richTextToken?: string;
  [propName: string]: any;
}
// // 可以不传，用来实现 ajax 请求
//     fetcher: (url, method, data, config) => {},
//
//     // 可以不传，全局 api 适配器。
//     // 另外在 amis 配置项中的 api 也可以配置适配器，针对某个特定接口单独处理。
//     responseAdpater(api, response, query, request) {
//       return response;
//     }
//
//     // 可以不传，用来接管页面跳转，比如用 location.href 或 window.open，或者自己实现 amis 配置更新
//     // jumpTo: to => { location.href = to; },
//
//     // 可以不传，用来实现地址栏更新
//     // updateLocation: (to, replace) => {},
//
//     // 可以不传，用来判断是否目标地址当前地址。
//     // isCurrentUrl: url => {},
//
//     // 可以不传，用来实现复制到剪切板
//     // copy: content => {},
//
//     // 可以不传，用来实现通知
//     // notify: (type, msg) => {},
//
//     // 可以不传，用来实现提示
//     // alert: content => {},
//
//     // 可以不传，用来实现确认框。
//     // confirm: content => {},
//
//     // theme: 'cxd' // 主题，默认是 default，还可以设置成 cxd 或 dark，但记得引用它们的 css，比如 sdk 目录下的 cxd.css
interface IEmbedEnv extends RenderOptions {
  responseAdpater?(api: any, response: any, query: any, request: any): any; //注意，amis拼写就是错误的，只能错着用
  toastPosition?: string;
  theme?: string;
  getModalContainer?(): HTMLElement;
}
interface IEmbedModule {
  embed(container: string | HTMLElement, schema: any, props: IEmbedProps, env: IEmbedEnv): IScopedContext;
}
export {IEmbedModule, IEmbedEnv};
