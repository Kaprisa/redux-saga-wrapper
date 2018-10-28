import * as R from 'ramda';
import { all, takeEvery } from 'redux-saga/effects';

import {
  sagaWrapper, sagaTrigger, createModuleSaga, moduleAction, successCase,
  setError, findIndexById, idEq,
} from 'redux-saga-wrapper/helpers';

import { ERROR, actions } from 'redux-saga-wrapper/constants';

export const moduleName = 'product';

export const productSagaTrigger = sagaTrigger(moduleName);
export const productSagaWrapper = sagaWrapper(moduleName);
export const productSuccessCase = successCase(moduleName);
export const productModuleAction = moduleAction(moduleName);

const Product = {
  name: null,
  user_id: null,
  prices: {},
};

const ReducerState = {
  product: R.clone(Product),
  products: [],
  error: null,
};

const indexByType = R.indexBy(R.prop('price_type_id'));
const productLens = R.lensProp('product');
const productsLens = R.lensProp('products');

export default function reducer(state = R.clone(ReducerState), action) {
  const { type, payload } = action;
  setError(null, state);
  switch (type) {
    case productSuccessCase(actions.add):
    case productSuccessCase(actions.show):
      return R.set(productLens, R.merge(Product, payload), state);
    case productSuccessCase(actions.update):
      if (state.product.id === payload.id) {
        return R.over(productLens, R.mergeDeepLeft(payload), state);
      }
      return R.over(
        R.lensPath(['products', findIndexById(payload.id, state.products)]),
        R.mergeDeepLeft(payload),
        state,
      );
    case productSuccessCase(actions.all):
      return R.set(
        productsLens,
        R.map(R.over(R.lensProp('prices'), indexByType), payload),
        state,
      );
    case productModuleAction(actions.clear):
      return R.clone(ReducerState);
    case productModuleAction('prepend'):
      return R.compose(
        R.over(productsLens, R.prepend(state.product)),
        R.set(productLens, R.clone(Product)),
      )(state);
    case productModuleAction(ERROR):
      return setError(payload, state);
    case productSuccessCase(actions.delete):
      return R.over(productsLens, R.reject(idEq(payload)), state);
    default:
      return state;
  }
}

export const saga = function* () {
  // yield all(createModuleSaga(moduleName)) // if you don't need to override default behaviour of any actions
  yield all([
    takeEvery(productModuleAction(actions.add), productSagaWrapper(addProductSaga)), // override add action
    ...createModuleSaga(moduleName, R.omit([actions.add], actions)), // create sagas for each action besides add
  ]);
};
