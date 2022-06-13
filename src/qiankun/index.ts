import { ObjectType, registerMicroApps, RegistrableApp, start } from 'qiankun';
import qiankunStore from './qiankunState';
import { StoreUtil} from '@/hooks/utils';
interface IAPP { 
  name: string,
  entry: string,
  container:string,
  mainRouterPath:string,
}
export const initQiankun = (store:StoreUtil,list:Array<IAPP>) => {
  qiankunStore.init(store)
  let appList:any = [];
  list.forEach(item => { 
    appList.push({
      name: item.name,
      entry: item.entry,
      container: item.container,
      props: {
        mainRouterPath: item.mainRouterPath,
        getGlobalState: qiankunStore.getGlobalState
      },
      activeRule: (e:Location) => {
        return e.hash.includes(item.mainRouterPath);
      },
    })
  })

  registerMicroApps(appList);
  start({
    prefetch :true
  });
}

export const setData = (state:any) => { 
  // 初始化 state
  // const actions: MicroAppStateActions = initGlobalState(state);

  // actions.onGlobalStateChange((state, prev) => {
  //   // state: 变更后的状态; prev 变更前的状态
  //   console.log(state, prev);
  // });
  // actions.setGlobalState(state);
  // actions.offGlobalStateChange();
}