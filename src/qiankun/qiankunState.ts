import { initGlobalState, MicroAppStateActions } from 'qiankun';
import { State as IglobalState } from '@/store/modules/global/state';
import { StoreUtil } from '@/hooks/utils';

let globalState:IglobalState = {
  system: false,
  customer:false
}


const actions: MicroAppStateActions = initGlobalState(globalState)

class qiankunStore{
  static store: StoreUtil;
  //将数据数据更新到子应用,并将信息保存在Vuex
  static setGlobalState=(state:IglobalState): void =>{ 
    actions.setGlobalState(state);
    const { commit } = this.store;
    commit('globalModule/GlobalINFO', state)
  }

  //自定义钩子，供子应用在挂载后主动获取主应用的信息
  static getGlobalState=():IglobalState=>{ 
    const { state } = this.store;
    return state.globalModule;
  }

  static init=(store: StoreUtil)=> { 
    this.store = store;
    const { commit } = store;
    //添加监听，当微应用状态更新后，会触发监听，将数据从子应用同步到主应用,并将信息保存在Vuex
    actions.onGlobalStateChange((state, prev) => {
      console.log('main监听', state, prev)
      commit('globalModule/GlobalINFO',  state as IglobalState)
    });
  }
}

export default qiankunStore;
