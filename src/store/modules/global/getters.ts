import { GetGppList } from './type';
import { State } from './state';
const getters = {
  [GetGppList](state: State){// 次方法是直接返回user这个数据
    return state.appList;
  },
}
export default getters;