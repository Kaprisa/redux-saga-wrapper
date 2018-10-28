import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import {history} from 'redux-saga-wrapper/modules';
import store from './store';

import Shop from './components/Shop';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={Shop}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
