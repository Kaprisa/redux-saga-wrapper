import { put, call } from 'redux-saga/effects';
import { successCase } from '../helpers';
import { actions } from '../constants';
import { axios } from '../modules';

export default moduleName => function* (id) {
  if (!id) {
    yield put({
      type: successCase(moduleName)(actions.clear),
      payload: null,
    });
    return;
  }
  const { data } = yield call(axios.get, `/${moduleName}/${id}`);
  yield put({
    type: successCase(moduleName)(actions.show),
    payload: data,
  });
  return data;
};
