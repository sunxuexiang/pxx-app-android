import { fromJS } from 'immutable';
import { Actor, Action } from 'plume2';

export default class LoadingActor extends Actor {
  defaultState() {
    return {
      loading: true,
      loadingVisible: false,
      isShowOutStock: false,
      outStockGoodsList:fromJS([]),
      isConfirmClick:false,
    };
  }

  @Action('purchase: loading')
  loading(state, loading) {
    return state.set('loading', loading);
  }

  @Action('set: loadingVisible')
  loadingVisible(state, loading) {
    return state.set('loadingVisible', loading);
  }
  @Action('purchase:isShowOutStock')
  isShowOutStock(state, isShowOutStock) {
    return state.set('isShowOutStock', isShowOutStock);
  }
  @Action('purchase:outStockGoodsList')
  outStockGoodsList(state, outStockGoodsList) {
    return state.set('outStockGoodsList', fromJS(outStockGoodsList));
  }
  @Action('purchase:isConfirmClick')
  isConfirmClick(state, isConfirmClick) {
    return state.set('isConfirmClick', isConfirmClick);
  }
}
