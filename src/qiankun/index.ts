import { registerMicroApps, start,initGlobalState, MicroAppStateActions  } from 'qiankun';

export const initQiankun = () => {
  registerMicroApps([
    {
      name: 'system', // app name registered
      entry: '//localhost:7101',
      container: '#yourContainer',
      props: {
        mainRouterPath:"/portal/system"
      },
      activeRule: (e:Location) => {
        return e.hash.includes('/portal/system');
      },
    },
    {
      name: 'customer', // app name registered
      entry: '//localhost:7102',
      container: '#yourContainer1',
      props: {
        mainRouterPath:"/portal/customer"
      },
      activeRule: (e:Location) => {
        
        return e.hash.includes('/portal/customer');
      },
    }
  ]);
  start({
    prefetch :true
  });
}

export const setData = (state:any) => { 
  // 初始化 state
  const actions: MicroAppStateActions = initGlobalState(state);

  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  actions.setGlobalState(state);
  // actions.offGlobalStateChange();
}