import { GlobalINFO,GppList } from './type';
import { State } from './state';
 
const mutations = {
  [GlobalINFO](state: State, e: State): void{
    state = {...state,...e};
  },
  [GppList](state: State, e:[]): void{
    state.appList = e;
  }
}
 
export default mutations;