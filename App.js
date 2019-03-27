import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Home from './components/Home'
import middlewares from './middlewares/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middlewares)}>
        <Home />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
