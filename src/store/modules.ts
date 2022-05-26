import userModule from './modules/user';
import { State as UserModuleState } from './modules/user/state';
import loginModule from './modules/login';
import { State as LoginModuleState } from './modules/login/state';

export type State = {// 声明所有模块的state类型
  userModule: UserModuleState,
  loginModule:LoginModuleState
}
 
export default {
  userModule,
  loginModule
}