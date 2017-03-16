import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../action';

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    state = {
        email: '',
        password: ''
    }

    renderError = () => {
        if (!this.props.error) {
            return;
        }
        return <Text style={styles.errorMsg}>{this.props.error}</Text>;
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        height={50}
                        width={250}
                        autoFocus
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        width={250}
                        height={50}
                        secureTextEntry
                    />
                </View>
                {this.renderError()}
                <View>
                    <Button onPress={() => this.props.login(this.state)} title="Login" />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#ccc',
        padding: 10
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 16,
    },
    input: {
        fontSize: 16,
    },
    errorMsg: {
        color: 'red',
        fontSize: 20
    }
};

export default connect(
    state => ({
        user: state.Auth.user,
        error: state.Auth.error
    }), { login })(Login);
