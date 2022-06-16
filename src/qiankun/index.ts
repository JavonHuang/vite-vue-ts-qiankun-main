import {  registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun';
import qiankunStore from './qiankunState';
import { StoreUtil } from '@/hooks/utils';
import { ElLoading, FIRST_LAST_KEYS } from 'element-plus'
declare global {  //设置全局属性
  interface Window {  //window对象属性
    qiankunStarted: boolean;   //加入对象
  }
}
window.qiankunStarted=false

interface IAPP { 
  name: string,
  entry: string,
  container:string,
  mainRouterPath: string,
  isFirst:Boolean,
}
export const initQiankun = (store:StoreUtil,list:Array<IAPP>,error:(app:IAPP)=>void) => {
  qiankunStore.init(store)
  let appList: any = [];
  let loadingInstance: any;
  let errorFunction: any = {};
  list.forEach(item => {
    item.isFirst = true;
    appList.push({
      name: item.name,
      entry: item.entry,
      container: item.container,
      props: {
        mainRouterPath: item.mainRouterPath,
        getGlobalState: qiankunStore.getGlobalState,
        errorRouter:'/404'
      },
      activeRule: (e: Location) => {
        if ( e.hash.includes(item.mainRouterPath) && item.isFirst) { 
          loadingInstance = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: `${item.name}加载中`,
            background: 'rgba(0, 0, 0, 0.7)',
          })
          item.isFirst = false;
          errorFunction[item.name] = (handler: any) => { 
            let appOrParcelName = "";
            appOrParcelName = handler.reason && handler.reason.appOrParcelName
            appOrParcelName=handler.error && handler.error.appOrParcelName
            if (appOrParcelName==item.name) { 
              error(item)
              if (loadingInstance) { 
                loadingInstance.close();
                loadingInstance = null;
              }
            }
          }
          addGlobalUncaughtErrorHandler(errorFunction[item.name])
        }
        return e.hash.includes(item.mainRouterPath);
      },
    })
  })

  registerMicroApps([...appList], {
    beforeLoad: [async (app: any) => { 
      console.log('beforeLoad',app)
    }],
    beforeMount: [async (app:any) => { 
      let dom = document.getElementById(app.container.replace('#',''));
      dom?.setAttribute('style','display:block');
    }],
    afterMount: [async (app: any) => { 
      if (loadingInstance) { 
        loadingInstance.close();
        loadingInstance = null;
      }
    }],
    afterUnmount: [async (app: any) => { 
      let dom = document.getElementById(app.container.replace('#',''));
      dom?.setAttribute('style','display:none')
    }],
  });
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    start({
      prefetch :true
    });
    // addGlobalUncaughtErrorHandler((handler) => {
    //   // error(handler)
    //   if (loadingInstance) { 
    //     loadingInstance.close();
    //     loadingInstance = null;
    //   }
    //   console.log(handler)
    // });
  }
}