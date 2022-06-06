import { registerMicroApps, start } from 'qiankun';

export const initQiankun = () => {
  registerMicroApps([
    {
      name: 'vueapp', // app name registered
      entry: '//localhost:3000',
      container: '#yourContainer',
      activeRule: (e)=>{
        return true;
      },
    }
  ]);
  start();
}