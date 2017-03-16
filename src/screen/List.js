import React, { Component } from 'react';
import { View, Text, Animated, Button } from 'react-native';
import { ListView } from 'realm/react-native';
import { connect } from 'react-redux';
import { loadTodo } from '../action';

const renderHeaderButton = (title, state) => {
    return (
        <Button onPress={() => state.params.gotoAdd()} title={title} />
    );
};

class List extends Component {

    static navigationOptions = {
        title: 'List Todo',
        header: ({ state }) => {
            const right = renderHeaderButton('Add', state);
            return {
                tintColor: '#fff',
                backTitle: null,
                style: {
                    backgroundColor: '#00a3c0',
                },
                titleStyle: {
                    fontSize: 22,
                    fontWeight: '300',
                    alignSelf: 'center'
                },
                right
            };
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };

        this.createDataSource(this.props);
    }

    componentWillMount() {
        this.props.loadTodo();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            gotoAdd: this.gotoAdd.bind(this),
        });
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

    gotoAdd = () => {
        this.props.navigation.navigate('Add');
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

export default connect(state => ({ todos: state.Todo.todos }), { loadTodo })(List);
