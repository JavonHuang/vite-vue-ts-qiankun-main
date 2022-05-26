import { ActionContext } from 'vuex';
import { ActionUserItem,CommitUser } from './type';
import { State, IUserItem } from './state';
 
const actions = {
  /* 
  UserType: type文件中定义的方法名称
  State：当前模块的数据源类型
  UserItemType：当前方法参数的数据约定
  */
  [ActionUserItem]({ commit }: ActionContext<State, unknown>, userItem: IUserItem): void{
    commit(CommitUser, userItem);
  }
}
 
export default actions;