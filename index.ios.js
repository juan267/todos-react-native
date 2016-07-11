/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Todo } from './src/Todo'

const Main = () => <Todo />

AppRegistry.registerComponent('todoApp', () => Main);
