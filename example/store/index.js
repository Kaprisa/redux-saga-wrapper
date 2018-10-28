import ReduxWrapper from 'redux-saga-wrapper';
import reducers from './reducers';
import sagas from './sagas';

const reduxWrapper = new ReduxWrapper(reducers, sagas);

export default reduxWrapper.getStore();
