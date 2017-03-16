import { StackNavigator } from 'react-navigation';
import List from './screen/List';
import Edit from './screen/Edit';
import Add from './screen/Add';

const RootNavigation = StackNavigator(
    {
        List: { screen: List },
        Add: { screen: Add },
        Edit: { screen: Edit },
    }, {
        initialRouteName: 'List',
        mode: 'modal',
        headerMode: 'screen',
        onTransitionStart: () => console.log('onTransitionStart'),
        onTransitionEnd: () => console.log('onTransitionEnd'),
    }
);
export default RootNavigation;
