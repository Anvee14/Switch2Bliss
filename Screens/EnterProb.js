import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import db from '../config';
import firebase from 'firebase';



export default class EnterProb extends Component {
    render() {
        return (
            <View><Text>hello suni</Text></View >
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#65C7D0',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
