import { StackNavigator } from 'react-navigation';
import Login from './screen/Login';
import List from './screen/List';
import Edit from './screen/Edit';
import Add from './screen/Add';

const RootNavigator = StackNavigator(
    {
        Login: { screen: Login },
        List: { screen: List },
        Add: { screen: Add },
        Edit: { screen: Edit },
    }, {
        initialRouteName: 'Login',
        mode: 'modal',
        headerMode: 'screen',
        onTransitionStart: () => console.log('onTransitionStart'),
        onTransitionEnd: () => console.log('onTransitionEnd'),
    }
);

export default RootNavigator;
