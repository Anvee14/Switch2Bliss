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
    ScrollView,
    Image,

} from 'react-native';


import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";


export default class EnterProb extends Component {
    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            nickName: ''
        }
        this.requestRef = null
    }
    getNickName = (userId) => {
        db.collection("users").where("email_id", "==", userId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        nickName: doc.data().nick_name
                    })
                });
            })
    }
    componentDidMount() {
        this.getNickName(this.state.userId)
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.heading}>Hello {this.state.nickName}</Text>
                <Text style={styles.text}>What Challenges are</Text>
                <Text style={styles.text}>You Facing.....?</Text>

            </View >

        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8EBCEE',
        alignItems: 'center',
    },
    heading: {
        marginTop: "10%",
        fontSize: RFValue(35),
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center',
        //  marginLeft: 'center'
    },
    text: {
        fontSize: RFValue(27),
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gif: {
        width: RFValue(100),
        height: RFValue(70),


    }
})
