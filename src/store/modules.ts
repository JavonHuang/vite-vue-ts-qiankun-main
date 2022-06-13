import userModule from './modules/user';
import { State as UserModuleState } from './modules/user/state';
import loginModule from './modules/login';
import { State as LoginModuleState } from './modules/login/state';
import globalModule from './modules/global';
import { State as GlobalModuleState } from './modules/global/state';

export type State = {// 声明所有模块的state类型
  userModule: UserModuleState,
  loginModule: LoginModuleState
  globalModule:GlobalModuleState
}
 
export default {
  userModule,
  loginModule,
  globalModule
}