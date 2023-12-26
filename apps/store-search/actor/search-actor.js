import { Action, Actor } from 'plume2';

export default class SearchActor extends Actor {
  defaultState() {
    return {
      searchHistory: [],
      queryString: ''
    };
  }

  @Action('search:history')
  initHistory(state, searchHistory) {
    return state.set('searchHistory', searchHistory);
  }

  @Action('search:queryString')
  queryString(state, queryString) {
    return state.set('queryString', queryString);
  }
}
