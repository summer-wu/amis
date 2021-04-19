import {
  types,
  getEnv,
  detach,
  setLivelynessChecking,
  isAlive,
  Instance
} from 'mobx-state-tree';
import 'setimmediate';
import {iRendererStore, IIRendererStore, SIRendererStore} from './iRenderer';
import {ServiceStore} from './service';
import {ComboStore} from './combo';
import {FormStore} from './form';
import {CRUDStore} from './crud';
import {TableStore} from './table';
import {ListStore} from './list';
import {ModalStore} from './modal';
import {TranslateFn} from '../locale';
import find from 'lodash/find';
import {IStoreNode} from './node';
import {FormItemStore} from './formItem';
import {registerStore, getStoreById, getStores, removeStore} from './manager';
import {PaginationStore} from './pagination';
import {AppStore} from './app';
import {RootStore} from './root';

setLivelynessChecking(
  process.env.NODE_ENV === 'production' ? 'ignore' : 'error'
);

const allowedStoreList = [
  ServiceStore,
  FormStore,
  ComboStore,
  CRUDStore,
  TableStore,
  ListStore,
  ModalStore,
  FormItemStore,
  PaginationStore,
  AppStore
];

interface IAddStoreParams {
  storeType: string;
  id: string;
  path: string;
  parentId?: string;
  [propName: string]: any;
}

export const RendererStore = types
  .model('RendererStore', {
    storeType: 'RendererStore'
  })
  .views(self => ({
    get fetcher() {
      return getEnv(self).fetcher;
    },

    get notify() {
      return getEnv(self).notify;
    },

    get isCancel(): (value: any) => boolean {
      return getEnv(self).isCancel;
    },

    get __(): TranslateFn {
      return getEnv(self).translate;
    },
    getStoreById(id: string) {
      return getStoreById(id);
    },

    get stores() {
      return getStores();
    }
  }))
  .actions(self => ({
    addStore(store_params: IAddStoreParams): IStoreNode {
      if (store_params.storeType === RootStore.name) {
        return registerStore(RootStore.create(store_params, getEnv(self)));
      }

      //用store_factory是一个object，它有create方法用于创建store
      const store_factory = find(
        allowedStoreList,
        item => item.name === store_params.storeType
      )!;

      const store: IStoreNode = store_factory.create(
        store_params as any,
        getEnv(self)
      );
      (store as any).$create_store_params = store_params; //增加一个特殊属性 $create_store_params，用于调试
      registerStore(store);
      return store;
    },

    removeStore(store: IStoreNode) {
      // store.dispose();
      removeStore(store);
    }
  }));

export type IRendererStore = Instance<typeof RendererStore>;
export {iRendererStore, IIRendererStore};
export const RegisterStore = function (store: any) {
  allowedStoreList.push(store as any);
};
