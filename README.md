#  乾坤微前端集成框架
> ***让部分人跑在前头，分享成功的喜悦***

**由于是自己根据多年的框架经验及实践项目业务场景经验总结开发出来的，不能说适应全部业务需求场景，但是大方向应该是没有问题的，毕竟巨石项目一直是企业级大规模集成系统平台的痛点。大家在使用过程中如果有实际的应用场景需求的话，可以提到Issues，我会尽我所能给大家提供可行的解决方案。**

## 虽说只是代码的搬运工，但是开发不易，麻烦给个Star★吧(☺️右上角点击★Star，轻轻松松，一秒钟🤣)！我会根据大家的关注度和个人时间持续更新代码！大家也可以留意我的  [CSDN博客](https://blog.csdn.net/Javon_huang)我会再博客对项目进行详细的的介绍。
**如你想接收更新消息，你可以Watch下，有问题请提到Issues。**

# 导航
- [Vue3+TypeScript+Vite](#vue3-typescript-vite)
- [Recommended IDE Setup](#recommended-ide-setup)
- [乾坤微前端](#乾坤微前端)
- [项目介绍](#项目介绍)
- [配套子应用项目](#配套子应用项目)
- [功能点](#功能点)
  - [通过接口获取子应用列表实现动态配置微应用](#通过接口获取子应用列表实现动态配置微应用)
  - [处理路由异常及应用加载异常公用主应用错误页面](#处理路由异常及应用加载异常公用主应用错误页面)
  - [实现主应用与子应用间双向通信](#实现主应用与子应用间双向通信)
  - [子应用页面共享](#子应用页面共享)
- [博客详细介绍参考](#博客详细介绍参考)

## Vue3 Typescript Vite
本项目使用Vue 3和[Vite](https://vitejs.cn/guide/)结合TypeScript进行开发。模板使用Vue 3 `<script setup>`更多信息参考 [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 乾坤微前端

qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

qiankun 孵化自蚂蚁金融科技基于微前端架构的云产品统一接入平台，更多信息科参考[乾坤官网](https://qiankun.umijs.org/)介绍。

## 项目介绍
当前项目是微前端的主应用项目，将作为一个系统集成平台。其他子系统将通过qiankun.js的方式接入平台。配套子项目可以通过已**配套子应用项目**下获取，有关通过接口动态获取子应用的API，小编这里使用了用友的yapi免费的[Mock平台](https://mock.yonyoucloud.com/),各位可以在下载项目后自己创建自己的mock数据。


## 配套子应用项目
- [system应用](https://github.com/JavonHuang/vue2-qiankun-system)
- [customer应用](https://github.com/JavonHuang/vue2-qiankun-customer)

## 功能点

### 通过接口获取子应用列表实现动态配置微应用

  主应用在登陆后在portal.vue页面获取子应用列表并注册到乾坤微前端进行预加载。
  
### 处理路由异常及应用加载异常公用主应用错误页面

  在qiankun.js中子应用的激活挂载是通过路由来识别的，也就是所有的应用其实是公用一个URL的，子应用内报错想要使用主应用的错误页面的话，直接在子应用跳转错误路由就好。所以在注册子应用的时候，我们就需要把主应用的错误路由URL传递给子应用。qiankun.js注册子应用的时候提供了props的参数供主应用传递额外参数给子应用。如下：通过errorRouter字段将错误路由传递给子应用。

```
{
  name: item.name,
  entry: item.entry,
  container: item.container,
  props: {
    mainRouterPath: item.mainRouterPath,
    getGlobalState: qiankunStore.getGlobalState,
    errorRouter:'/404'
  },
  activeRule: (e: Location) => {
    return e.hash.includes(item.mainRouterPath);
  },
}
``` 
### 实现主应用与子应用间双向通信

  qiankun.js提供initGlobalState注册全局状态及onGlobalStateChange进行状态监听。这部分内容官网都有介绍，具体可以移步官网小编在此就不再做介绍。现在主要介绍，子应用在挂在的时候主动获取主应用的信息。针对这个业务场景我们可以通过在props注册回调的方式实现。**getGlobalState**这个函数就是供子应用挂载后立马获取主应用的信息。在子应用调用：
```
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  const param = { system: true }
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('system son监听', state, prev)
  })
  render(props)
  // 在子应用更新数据，同步到主应用
  props.setGlobalState(param)
  console.log('system初始化获取主应用数据', props.getGlobalState())
}
``` 
### 子应用页面共享

  在微前端的概念里面，各个子系统子建最好是独立的存在，尽量不要涉及到各个子应用中相互嵌套耦合的情况。但是在实际开发应用场景中往往过=还是回出现A系统需要内嵌B系统的页面的业务场景。然而qiankun.js是通过路由来控制页面跳转的，同一个页面想要加载两个系统页面显然有点行不通。
  所以这里小编通过组件库的方式来实现。例如A系统内需要嵌入B系统的页面，那么我们可以将B系统的页面打包成一个组件库，然后载主应用里面以js的形式引入，那么所有的子系统内都可以把B系统的页面当作一个普通组件来使用而不是路由页面。
  **缺点**
  当然这个解决方案要求A，B两个系统都是基于同一个框架构建的项目。如果一个是Vue一个是React的那么组件载各个系统间就不能通用了。
  
  如果真的实现这种状况，那只能通过iframe内嵌解决了。
  
## 博客详细介绍参考
  [CSDN博客](https://blog.csdn.net/Javon_huang)    
  
