import { put, call } from 'redux-saga/effects';
import { successCase } from '../helpers';
import { actions } from '../constants';
import { axios } from '../modules';

export default moduleName => function* (data) {
  yield call(axios.put, `/${moduleName}/${data.id}`, data);
  yield put({
    type: successCase(moduleName)(actions.update),
    payload: data,
  });
};
