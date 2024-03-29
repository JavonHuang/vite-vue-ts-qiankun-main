import {  registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun';
import qiankunStore from './qiankunState';
import { StoreUtil } from '@/hooks/utils';
import { ElLoading, FIRST_LAST_KEYS } from 'element-plus'
import { truncate } from 'fs';

window.qiankunStarted=false

interface IAPP { 
  name: string,
  entry: string,
  container:string,
  isFirst:Boolean,
}
export const initQiankun = (store:StoreUtil,list:Array<IAPP>,error:(e:any)=>void) => {
  qiankunStore.init(store)
  let appList: any = [];
  let loadingInstance: any;
  let errorFunction: any = {};
  let domMain = document.getElementById('qiankunContainer');
  list.forEach(item => {
    item.isFirst = true;
    appList.push({
      name: item.name,
      entry: item.entry,
      container: `#qiankun_item_${item.name}`,
      props: {
        mainRouterPath:`/${item.name}`,
        getGlobalState: qiankunStore.getGlobalState,
      },
      activeRule: (e: Location) => {
        if ( e.hash.includes(`/${item.name}`) && item.isFirst) { 
          loadingInstance = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: `${item.name}加载中`,
            background: 'rgba(0, 0, 0, 0.7)',
          })
          item.isFirst = false;
          errorFunction[item.name] = (handler: any) => {
            console.log(handler)
            let appOrParcelName = "";
            appOrParcelName = handler.reason && handler.reason.appOrParcelName
            appOrParcelName=handler.error && handler.error.appOrParcelName
            if (appOrParcelName==item.name) { 
              error({...item,message:handler.message})
              if (loadingInstance) { 
                loadingInstance.close();
                loadingInstance = null;
              }
            }
          }
          addGlobalUncaughtErrorHandler(errorFunction[item.name])
        }
        return e.hash.includes(`/${item.name}`);
      },
    })
    let dom = document.createElement('div');
    dom.classList.add('qiankun-app')
    dom?.setAttribute('style', 'display:none')
    dom?.setAttribute('id',`qiankun_item_${item.name}`)
    domMain?.append(dom)
  })

  registerMicroApps([...appList], {
    beforeLoad: [async (app: any) => { 
      console.log('beforeLoad',app)
    }],
    beforeMount: [async (app: any) => { 
      let dom = document.getElementById(`qiankun_item_${app.name}`);
      dom?.setAttribute('style','display:block');
    }],
    afterMount: [async (app: any) => { 
      if (loadingInstance) { 
        loadingInstance.close();
        loadingInstance = null;
      }
    }],
    afterUnmount: [async (app: any) => { 
      let dom = document.getElementById(`qiankun_item_${app.name}`);
      dom?.setAttribute('style','display:none')
    }],
  });
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    start({
      prefetch: true,
      sandbox: {
        //未成熟
        // strictStyleIsolation: true,
        // experimentalStyleIsolation: true,
      },
    });
  }
}