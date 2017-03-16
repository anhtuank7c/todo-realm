import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import RootNavigation from './RootNavigation';

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    );
};

AppRegistry.registerComponent('Todo', () => App);
