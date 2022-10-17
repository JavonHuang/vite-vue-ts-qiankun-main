declare global {  //设置全局属性
  export interface Window {  //window对象属性
    qiankunStarted: boolean;   //加入对象
    mainLoading: any; // 全局注册loading层函数，可在子应用调用
    rootRouter: any; // 全局注册路由跳转，可在子应用调用
  }
}
export {}