import { State } from './../store/modules';
import { Getters } from "./getters";
import { Commit } from './commit';
import { Dispatch } from './dispatch';
 
export interface StoreUtil {
  state: State;
  getters: Getters;
  commit:Commit,
  dispatch:Dispatch
}