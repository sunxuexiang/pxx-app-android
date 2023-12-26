import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

//@ts-ignore
const composeEnhancers = compose;

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === "development") {
  middlewares.push(require("redux-logger").createLogger());
}

const middlewareEnhancer = applyMiddleware(...middlewares);
const composedEnhancers = composeEnhancers(middlewareEnhancer);

let GolbalStore = createStore(
  combineReducers(rootReducer),
  undefined,
  composedEnhancers,
);
let currentReducer = rootReducer;

//动态注册reducer
export function registerReducer(reducerMap: {[name: string]: Function}) {
  //判断是否重复.
  // for (let key in reducerMap) {
  //   if (currentReducer[key]) {
  //     throw new Error(
  //       `the register reducer conflict with reducer name: ${key},please modify the reducer name`,
  //     );
  //   }
  // }
  currentReducer={
    ...currentReducer,
    ...reducerMap,
  };

  GolbalStore.replaceReducer(
    combineReducers(currentReducer),
  );
}

/**
 *
 * @param reducerKey
 * @returns {T}
 */
export function getReducerData<T>(reducerKey: string): T {
  return GolbalStore.getState()[reducerKey] as any;
}

export default GolbalStore;
