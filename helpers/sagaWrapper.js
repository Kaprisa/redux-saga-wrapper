import { call, put } from 'redux-saga/effects';
import { ERROR } from '../constants';
import { moduleAction } from '.';

export default (moduleName, saga, parent) => {
  const wrapper = f => function* (action) {
    try {
      yield call(f, action.payload, parent);
    } catch (error) {
      yield put({
        type: moduleAction(moduleName)(ERROR),
        payload: error && error.response && error.response.data.message,
      });
    }
  };
  return saga ? wrapper(saga(moduleName, parent)) : wrapper;
};
