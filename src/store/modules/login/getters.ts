import { GettersIsLogin } from './type';
import { State } from './state';
const getters = {
  [GettersIsLogin](state: State){// 次方法是直接返回user这个数据
    return state.isLogin;
  },
}
export default getters;