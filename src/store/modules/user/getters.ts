import { State, IUserItem } from './state';
import { GettersUser, GettersUserItem } from './type';
const getters = {
  [GettersUser](state: State){// 次方法是直接返回user这个数据
    return state.user;
  },
  /* 
  此方法是返回user中的某一个元素，根据传递的参数进行搜索返回，如果没有则返回undefined
  */
  [GettersUserItem]:(state: State): (age: number) => IUserItem | undefined => (age: number): IUserItem | undefined => {
    const item: IUserItem | undefined = state.user.find(item => item.age === age);
    return item;
  }
}
export default getters;