import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { ListView } from 'realm/react-native';
import { connect } from 'react-redux';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource = ({ todos }) => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state.dataSource = ds.cloneWithRows(todos);
    }

    renderRow = (todo) => {
        const bgColor = todo.completed ? { backgroundColor: 'grey' } : { backgroundColor: 'green' };
        return (
            <View style={bgColor}>
                <Text>{todo.content}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

export default connect(state => ({ todos: state.Todo.todos }))(List);
