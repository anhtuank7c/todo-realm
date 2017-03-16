import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import RootNavigator from './RootNavigator';

class AppNavigation extends React.Component {
    render() {
        return (
            <RootNavigator
                navigation={
                    addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav
                    })
                }
            />
        );
    }
}

export default connect(state => ({ nav: state.nav }))(AppNavigation);
