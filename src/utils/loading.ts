import { ElLoading } from 'element-plus'
export const mainLoading=(name:string)=>{
  return ElLoading.service({
    fullscreen: true,
    lock: true,
    text: `${name}加载中`,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}