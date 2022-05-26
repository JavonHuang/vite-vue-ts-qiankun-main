import { CommitIsLogin } from './type';
import { State } from './state';
 
const mutations = {
  [CommitIsLogin](state: State, isLogin: boolean): void{
    state.isLogin=isLogin;
  }
}
 
export default mutations;