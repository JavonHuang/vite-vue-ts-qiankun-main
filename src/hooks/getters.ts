import module from '@/store/modules';
/* 
首先我们需要的最终数据结构为如下
type Getters = {
  '模块名称/模块下的方法名称': 对应方法的返回值数据类型
}
例如：type Getters = {
  'userModule/GetUserType': {
    name: string;
    age: number;
  }[]
}
注意：module此时的数据格式为以下
userModule: {//模块名称
    namespaced: boolean;
    state: xxx;
    actions: xxx;
    mutations: xxx;
    getters: xxx;
}
*/
 
type GetModule<Modules> = Modules extends { getters: infer G } ? G : unknown;// 这里我们只需要获取getters属性
 
/* 
根据module类型，遍历模块名
*/
type GetModuleItems<Modules> = {
  [K in keyof Modules]: GetModule<Modules[K]>
}
/* 
此时我们的ModulesType的数据类型为
type ModulesType = {
  userModule: {
    GetUserType(state: {
      user: {
        name: string;
        age: number;
      }[];
    }): {
      name: string;
      age: number;
    }[];
    GetUserItemType: (state: {
      user: {
        name: string;
        age: number;
      }[];
    }) => (age: number) => {
      name: string;
      age: number;
    } | undefined;
  };
}
*/
type ModulesType = GetModuleItems<typeof module>;
 
/*
声明数据格式类型，参考上面注释解析 
 */
type GettersName<P, K> = `${P & string}/${K & string}`;
 
/* 
遍历泛型Modules，使其数据格式约定为GettersName类型
*/
type GetKeys<Modules> = {
  [K in keyof Modules]:GettersName<K, keyof Modules[K]>
}[keyof Modules];
 
/* 
GettersInfo次方法是约束并找到当前模块下的每一个函数的返回值类型
*/
type GettersInfo<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
 
/* 
遍历循环GettersName类型，并找出对应的函数方法
*/
type GettersFunc<T> = {
  [K in GetKeys<ModulesType>]: K extends `${infer A}/${infer B}` ? GettersInfo<T, A, B> : unknown;
}
type GettersFuncObj = GettersFunc<ModulesType>;
 
/* 
通过ReturnType返回函数的数据类型，并暴露外部使用，至此getters的声明结束
*/
export type Getters = {
  [K in keyof GettersFuncObj]: ReturnType<GettersFuncObj[K]>
}