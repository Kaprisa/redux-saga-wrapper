import { put, call } from 'redux-saga/effects';
import { successCase } from '../helpers';
import { actions } from '../constants';
import { axios } from '../modules';

export default moduleName => function* (id) {
  yield call(axios.delete, `${moduleName}/${id}`);
  yield put({
    type: successCase(moduleName)(actions.delete),
    payload: id,
  });
};
