import { GlobalINFO } from './type';
import { State } from './state';
 
const mutations = {
  [GlobalINFO](state: State, e: State): void{
    state = {...state,...e};
  }
}
 
export default mutations;