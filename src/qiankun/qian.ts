// import { initGlobalState } from 'qiankun'
// // import store from './index'

// class qiankunStore{
//   static initialState={};
//   static setGlobalState;
//   static actions=initGlobalState(this.initialState)
//   static setGlobalState=(e: {})=>{
//     this.initialState=e;
//     this.actions.setGlobalState(this.initialState);
//   };
//   //监听钩子，在子应用中使用，监听父应用状态变化，父应用不使用，避免死循环监听，而使用setMainVuex更改状态
//   static onGlobalStateChange=this.actions.onGlobalStateChange;
//   //向子应用注册钩子，获取父应用的状态
//   static getGlobalState=this.actions.setGlobalState=(callBack: (arg0: {}) => void)=>{
//     callBack(this.initialState);
//   };
//   // //向子应用注册钩子，调用更改父应用的状态
//   // static setMainVuex=(model_key: any,n: any)=>{
//   //   store.commit(model_key,n)
//   // }
// }

// export default qiankunStore
