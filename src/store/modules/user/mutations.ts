import { CommitUser } from './type';
import { State, IUserItem } from './state';
 
const mutations = {
  [CommitUser](state: State, userItem: IUserItem): void{
    state.user.push(userItem);
  }
}
 
export default mutations;