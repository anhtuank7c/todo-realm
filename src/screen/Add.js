import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Switch,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { saveTodo } from '../action';

const saveButton = (state) => {
    return <Button onPress={() => state.params.save()} title="Save" />;
};

class Add extends Component {
    static navigationOptions = {
        title: 'Add Task',
        header: ({ state }) => {
            return {
                titleStyle: {
                    alignSelf: 'center'
                },
                right: saveButton(state)
            };
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            completed: false
        };

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            save: this.save
        });
    }

    onChangeText = (text) => {
        this.setState({
            content: text
        });
    }

    onSwitchChange = (value) => {
        this.setState({
            completed: value
        });
    }

    save = () => {
        this.props.saveTodo(this.state);
    }

    // scrollToInput = (event) => {
    //     // Add a 'scroll' ref to your ScrollView
    //     this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(event.target));
    // }

    render() {
        return (
            <KeyboardAwareScrollView ref="scroll" style={styles.container}>
                <View style={styles.switch}>
                    <Text style={styles.switchLabel}>Completed</Text>
                    <Switch
                        value={this.state.completed}
                        onValueChange={this.onSwitchChange}
                    />
                </View>
                <TextInput
                    onChangeText={this.onChangeText}
                    value={this.state.content}
                    multiline
                    autoCorrect={false}
                    autoFocus
                    height={300}
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={this.save}
                />
            </KeyboardAwareScrollView>
        );
    }
}
const styles = {
    container: {
        backgroundColor: '#ccc',
        padding: 10,
    },
    switch: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switchLabel: {
        fontSize: 20,
    },
    input: {
        backgroundColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
    }
};

export default connect(null, { saveTodo })(Add);
