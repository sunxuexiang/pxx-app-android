import { Action, Actor } from 'plume2';

export default class SearchActor extends Actor {
  defaultState() {
    return {
      //当前显示的搜索历史列表
      searchHistory: [],
      hotHistory: [],
      queryString: '',
      key: 'goods', // tab当前选中的是商品还是商家
      preKeywords: '',  //预置词
      associationalWordList: []  //联想词
    };
  }

  @Action('search:history')
  initHistory(state, searchHistory) {
    return state.set('searchHistory', searchHistory);
  } 

  @Action('search:hot')
  initHot(state, hotHistory) {
    return state.set('hotHistory', hotHistory);
  }


  @Action('search:queryString')
  queryString(state, queryString) {
    return state.set('queryString', queryString);
  }

  @Action('tab:history')
  click(state, key) {
    return state.set('key', key);
  }

  @Action('searcher:setPre')
  initPreWord(state, preKeywords) {
    return state.set('preKeywords', preKeywords);
  } 

  @Action('searcher:associationalWordList')
  initAssociationalWord(state, associationalWordList) {
    return state.set('associationalWordList', associationalWordList);
  } 
}
