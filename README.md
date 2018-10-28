## Requirements

- env variable `API_URL`

## Example

- Example can be found in `./example` directory

## Store

```js
import ReduxWrapper from 'redux-saga-wrapper';
import reducers from './reducers';
import sagas from './sagas';

const reduxWrapper = new ReduxWrapper(reducers, sagas);

export default reduxWrapper.getStore();
```

## Basic duck structure

```js
import { all } from 'redux-saga/effects';
import * as R from 'ramda';

import {
  sagaWrapper, sagaTrigger, createModuleSaga, moduleAction, successCase,
  setError, findIndexById, idEq,
} from 'redux-saga-wrapper/helpers';

import { ERROR, actions } from 'redux-saga-wrapper/constants';

export const moduleName = 'example';

export const exampleSagaTrigger = sagaTrigger(moduleName);
export const exampleSagaWrapper = sagaWrapper(moduleName);
export const exampleSuccessCase = successCase(moduleName);
export const exampleModuleAction = moduleAction(moduleName);

const Example = {
  name: null,
};

const ReducerState = {
  example: R.clone(Example),
  examples: [],
  error: null,
};

export const exampleReducer = (state = R.clone(ReducerState), { type, payload }) => {
  setError(null, state); // set error to null
  switch (type) {
    case exampleSuccessCase(actions.add):
      /* do something with state */
      return state;
    case exampleSuccessCase(actions.show):
      /* do something with state */
      return state;
    case exampleSuccessCase(actions.update):
      /* do something with state */
      return state;
    case exampleSuccessCase(actions.all):
      /* do something with state */
      return state;
    case exampleSuccessCase(actions.delete):
      /* do something with state */
      return state; 
    case exampleModuleAction(ERROR):
      return setError(payload, state);
    default:
      return state;
  }
};

export const saga = function* () {
  yield all(createModuleSaga(moduleName))
};
```

## Helpers

```js
import { 
  createModuleSaga, sagaTrigger, sagaWrapper,
  moduleAction, successCase, setError,
  idEq, findIndexById,
} from 'redux-saga-wrapper/helpers';
```

## Saga wrappers

```js
import { addSaga, updateSaga, deleteSaga, showSaga, allSaga } from 'redux-saga-wrapper/sagas';
```

## Modules

```js
import { axios, history } from 'redux-saga-wrapper/modules';
```
