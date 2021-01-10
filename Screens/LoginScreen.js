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
import { Input, Icon } from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';

import { RFValue } from "react-native-responsive-fontsize";


export default class LoginScreen extends Component {
    
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            confirmPassword: '',
            isModalVisible: 'false',
            nickName: ''
        }
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("password doesn't match\nCheck your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        email_id: this.state.emailId,
                        nick_name: this.state.nickName,
                        password: this.state.password
                    })
                    return alert(
                        'User Added Successfully',
                        '',
                        [
                            { text: 'OK', onPress: () => this.setState({ "isModalVisible": false }) },
                        ]
                    );
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return alert(errorMessage)
                });
        }
    }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate('EnterProb')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }

    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text
                                style={styles.modalTitle}
                            >Registration</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email"}
                                placeholderTextColor='#343434'
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text
                                    })
                                }}

                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"nick name"}
                                placeholderTextColor='#343434'
                                onChangeText={(text) => {
                                    this.setState({
                                        nickName: text
                                    })
                                }}

                            /><TextInput
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                placeholderTextColor='#343434'
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                            /><TextInput
                                style={styles.formTextInput}
                                placeholderTextColor='#343434'
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                            />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() =>
                                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                    }
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => this.setState({ "isModalVisible": false })}
                                >
                                    <Text style={{ color: 'black' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render() {
        return (

            <View style={styles.container}>


                {
                    this.showModal()
                }
                <View >
                    <Text style={styles.heading}>Welcome</Text>
                </View>

                <View >
                    <View style={styles.sectionStyle}>
                        <Input
                            inputContainerStyle={styles.loginBox}
                            placeholder="Email"
                            placeholderStyle={{ fontSize: 60 }}
                            leftIcon={<Icon
                                type='font-awesome'
                                name='envelope'
                                size={35}
                                style={styles.icon}
                            />
                            }

                            keyboardType='email-address'
                            onChangeText={(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }}
                        />

                        <Image
                            style={styles.imageStyle}
                            source={{ uri: 'https://media.tenor.com/images/ada461a147f3d051b15d3abfca53aa7a/tenor.gif' }}
                        />
                    </View>
                    <View style={styles.sectionStyle}>

                        <Input
                            inputContainerStyle={styles.loginBox}
                            secureTextEntry={true}
                            placeholder="Password"
                            leftIcon={<Icon
                                type='font-awesome'
                                name='lock'
                                size={35}
                                style={styles.icon}
                            />
                            }
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                        <Image
                            style={styles.imageStyle}

                        />
                    </View>
                    <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                            onPress={() => {
                                this.userLogin(this.state.emailId, this.state.password)
                            }}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({ isModalVisible: true })}
                        >
                            <Text style={styles.buttonText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8EBCEE',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: RFValue(50),
        fontStyle: 'italic',
        alignItems: 'center',
        paddingBottom: RFValue(30),


    },
    icon: {

    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0,
        height: 50,
        margin: 20,
        borderBottomWidth: 3,
        paddingLeft: RFValue(10)
    },
    imageStyle: {
        marginBottom: '3%',
        height: 80,
        width: 135,
        resizeMode: 'stretch',
        marginLeft: RFValue(-130)
    },
    text: {
        fontSize: RFValue(20),
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        width: RFValue(230),
        height: RFValue(40),
        fontSize: RFValue(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        marginTop:RFValue(35),
       marginLeft: RFValue(-10)
    },
    button: {
        width: RFValue(170),
        height: RFValue(45),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#65C7D0",
        shadowColor: "#000",
        marginBottom: RFValue(10),
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.7,
        shadowRadius: 10.32,
        elevation: 26,
        marginLeft: '28%'
    },
    buttonText: {
        color: "black",
        fontWeight: "400",
        fontSize: RFValue(20),
    },
    label: {
        fontSize: RFValue(13),
        color: "#717D7E",
        fontWeight: 'bold',
        paddingLeft: RFValue(10),
        //marginLeft: RFValue(20)
    },
    formInput: {
        width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "black",
        paddingBottom: RFValue(10),
        //  marginLeft: RFValue(20),
        marginBottom: RFValue(14)
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
    registerButtonText: {
        fontSize: RFValue(12),
        fontWeight: "normal",
        color: "black",
    },
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: "#32867d",
        marginTop: RFValue(10)
    },



    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: 'black',
        margin: 50
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ADD8E6",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: 'black',
        borderRadius: 0,
        borderBottomWidth: 1.5,
        marginTop: 20,
        padding: 10
    },

    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    gif: {
        width: RFValue(130),
        height: RFValue(70),
        marginLeft: "30%",
        marginTop: "5%"

    }

})





