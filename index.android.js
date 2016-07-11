/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Main as Root } from './src/Main'
import { Provider } from 'react-redux'
import { store } from './src/store'

const Main = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

AppRegistry.registerComponent('todoApp', () => Main);
