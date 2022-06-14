import {  registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun';
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
        getGlobalState: qiankunStore.getGlobalState,
        errorRouter:'/404'
      },
      activeRule: (e:Location) => {
        return e.hash.includes(item.mainRouterPath);
      },
    })
  })

  registerMicroApps([...appList], {
    beforeLoad:[async (app) => console.log('before load', app.name)],
    beforeMount: [async (app) => console.log('before mount', app.name)],
  });
  start({
    prefetch :true
  });
}

addGlobalUncaughtErrorHandler((handler) => {
  console.log("异常捕获", handler);
});