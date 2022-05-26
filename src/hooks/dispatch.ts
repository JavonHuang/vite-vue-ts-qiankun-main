import module from '@/store/modules';
 
type GetModule<Modules> = Modules extends { actions: infer A } ? A : unknown;
type GetModuleItems<Modules> = {
  [K in keyof Modules]: GetModule<Modules[K]>
}
type ModulesType = GetModuleItems<typeof module>;
 
type GettersName<P, K> = `${P & string}/${K & string}`;
type GetKeys<Modules> = {
  [K in keyof Modules]: GettersName<K, keyof Modules[K]>
}[keyof Modules];
 
type GettersInfo<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
 
type GettersFunc<T> = {
  [K in GetKeys<ModulesType>]: K extends `${infer A}/${infer B}` ? GettersInfo<T, A, B> : unknown
}
type GettersFuncObj = GettersFunc<ModulesType>;
 
export type Dispatch = <K extends keyof GettersFuncObj>(type: K, options?: Parameters<GettersFuncObj[K]>[1]) => ReturnType<GettersFuncObj[K]>;