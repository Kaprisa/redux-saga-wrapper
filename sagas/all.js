import { put, call } from 'redux-saga/effects';
import { successCase, getUrl } from '../helpers';
import { actions } from '../constants';
import { axios } from '../modules';

export default (moduleName, parent) => function* (payload) {
  if (parent && !payload[`${parent}_id`]) return;
  const { data } = yield call(axios.get, getUrl(moduleName, parent, payload));
  yield put({
    type: successCase(moduleName)(actions.all),
    payload: data,
  });
};
