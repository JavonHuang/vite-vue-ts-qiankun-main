import module from "@/store/modules";
 
type GetModule<Modules> = Modules extends { mutations: infer M } ? M : unknown;
type GetModuleItems<Modules> = {
  [K in keyof Modules]: GetModule<Modules[K]>
}
type ModulesType = GetModuleItems<typeof module>;
 
type GettersName<P, K> = `${P & string}/${K & string}`;
type GetKeys<Modules> = {
  [K in keyof Modules]: GettersName<K, keyof Modules[K]>
}[keyof Modules]
type GettersInfo<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GettersFunc<T> = {
  [K in GetKeys<ModulesType>]: K extends `${infer A}/${infer B}` ? GettersInfo<T, A, B> : unknown
}
type GettersFuncObj = GettersFunc<ModulesType>;
 
export type Commit = <K extends keyof GettersFuncObj>(type: K, payload?: Parameters<GettersFuncObj[K]>[1]) => void