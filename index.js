import { all } from 'redux-saga/effects';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga';
import { history } from './modules';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);

export default class ReduxWrapper {

  constructor(reducers, sagas) {

    this.store = createStore(combineReducers({
        router: connectRouter(history),
        ...reducers
    }), enhancer);

    sagaMiddleware.run(function* rootSaga() {
      yield all(sagas.map(s => s()));
    });

  }

  getStore() {
    return this.store;
  }

}
