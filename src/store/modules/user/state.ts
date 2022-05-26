const StateData = () => {// 使用函数返回数据源
  return {
    user: [{
      name: 'Agwenbi',
      age: 26
    },{
      name: '张三',
      age: 24
    }]
    /* 
    ......
    根据自己情况自定义更多
    */
  }
}
export type State = ReturnType<typeof StateData>;// 使用ts的内置指令返回当前数据源的数据类型，并export出去供外部使用
type GetArrayItemType<T> = T extends (infer I)[] ? I : unknown;//当前方法是返回数组中元素的数据类型
export type IUserItem = GetArrayItemType<State['user']>;// 获取到key为user的数组元素的数据类型，为后面的actions使用
export default StateData();//返回当前模块的数据源