import { useStore as useStoreOld } from 'vuex';
import { StoreUtil } from './utils';
 
export const useStore = (): StoreUtil => {
  const { state, getters,commit,dispatch } = useStoreOld<StoreUtil['state']>();
  return {
    state,
    getters,
    commit,
    dispatch
  }
}