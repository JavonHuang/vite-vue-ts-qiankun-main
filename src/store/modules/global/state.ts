const StateData = () => {// 使用函数返回数据源
  return {
    system: false,
    customer:false
  }
}
export type State = ReturnType<typeof StateData>;
export default StateData();//返回当前模块的数据源