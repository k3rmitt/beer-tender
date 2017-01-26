import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore(middlewares);

const store = mockStore({navigation: {}, beers: [], cache: {}});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
