import { registerMicroApps, start } from 'qiankun';

export const initQiankun = () => {
  registerMicroApps([
    {
      name: 'vueapp', // app name registered
      entry: '//localhost:7101',
      container: '#yourContainer',
      activeRule: (e)=>{
        return true;
      },
    }
  ]);
  start();
}