import {  registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun';
import qiankunStore from './qiankunState';
import { StoreUtil } from '@/hooks/utils';
import { ElLoading } from 'element-plus'
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
  mainRouterPath:string,
}
export const initQiankun = (store:StoreUtil,list:Array<IAPP>,error:(handler: string | Event)=>void) => {
  qiankunStore.init(store)
  let appList: any = [];
  let loadingInstance:any;
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
      activeRule: (e: Location) => {
        if ( e.hash.includes(item.mainRouterPath)) { 
          loadingInstance = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: `${item.name}加载中`,
            background: 'rgba(0, 0, 0, 0.7)',
          })
        }
        return e.hash.includes(item.mainRouterPath);
      },
    })
  })

  registerMicroApps([...appList], {
    beforeLoad: [async (app: any) => { 

    }],
    beforeMount: [async (app:any) => { 
      let dom = document.getElementById(app.container.replace('#',''));
      dom?.setAttribute('style','display:block');
    }],
    afterMount: [async (app: any) => { 
      loadingInstance.close();
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
    addGlobalUncaughtErrorHandler((handler) => {
      error(handler)
      loadingInstance.close();
    });
  }
}