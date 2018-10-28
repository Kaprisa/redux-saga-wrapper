import { takeEvery } from 'redux-saga/effects';
import * as R from 'ramda';
import * as sagas from '../sagas';
import sagaWrapper from './sagaWrapper';
import { actions } from '../constants';

export default (name, only = actions, parent) => R.reduce(
  (o, action) => o.concat(
    takeEvery(
      `${parent ? `${parent}/` : ''}${name}/${action}`,
      sagaWrapper(name, sagas[`${action}Saga`], parent),
    ),
  ),
  [],
  R.values(only),
);
