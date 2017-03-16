import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigation from './AppNavigation';


const App = () => {
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
};

AppRegistry.registerComponent('Todo', () => App);
