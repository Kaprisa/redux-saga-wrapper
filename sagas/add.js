import * as R from 'ramda';
import { put, call } from 'redux-saga/effects';
import { successCase, getUrl } from '../helpers';
import { actions } from '../constants';
import { axios } from '../modules';

export default (moduleName, parent) => function* (payload) {
  if (R.any(R.not, R.values(R.dissoc('id', payload)))) return;
  if (parent && !payload[`${parent}_id`]) return;
  const { data: id } = yield call(axios.post, getUrl(moduleName, parent, payload), payload);
  yield put({
    type: successCase(moduleName)(actions.add),
    payload: { ...payload, id },
  });
  return id;
};
