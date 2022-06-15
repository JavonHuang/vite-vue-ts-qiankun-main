import {  registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun';
import qiankunStore from './qiankunState';
import { StoreUtil } from '@/hooks/utils';
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
    beforeMount: [async (app:any) => { 
      let dom = document.getElementById(app.container.replace('#',''));
      dom?.setAttribute('style','display:block');
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
  }
}

addGlobalUncaughtErrorHandler((handler) => {
  console.log("异常捕获", handler);
});