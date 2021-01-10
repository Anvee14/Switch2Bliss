import React, { Component, useState } from 'react';
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
    TouchableWithoutFeedback,
    Animated

} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const challenges = ['Anxiety', 'Stress', 'Depression']
//var animatedValue = new Animated.Value(1);
export default class EnterProb extends Component {

    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            nickName: '',
            selectedChallenges: [],
            setSelection: false,
            isSelected: false,
            isImagePressed: false,


        }
        this.requestRef = null
    }
    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }
    onSelectionsChange = (selectedChallenges) => {
        // selectedChallenges is array of { label, value }
        this.setState({ selectedChallenges: selectedChallenges })
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

    handlePress = () => {
        if (this.state.isImagePressed == false) {

            Animated.spring(this.animatedValue, {
                toValue: 0.8,
                useNativeDriver: false

            }).start()
            this.setState({
                isImagePressed: true
            })

        }
        if (this.state.isImagePressed == true) {
            Animated.spring(this.animatedValue, {
                toValue: 1,
                useNativeDriver: false
            }).start()
            this.setState({
                isImagePressed: false
            })
        }
    }


    renderOverlay = () => {
        return (
            <View style={styles.overlay}>
                <Image
                    source={require('../images/checkBox.png')}
                    style={styles.checkBoxImg}

                />
            </View>
        );
    }
    render() {
        const animatedStyle = {
            transform: [{ scale: this.animatedValue }]

        }
        return (

            <View style={styles.container}>
                <Text style={styles.heading}>Hello {this.state.nickName}</Text>
                <Text style={styles.text}>What Challenges are</Text>
                <Text style={styles.text}>You Facing.....?</Text>
                <Text style={styles.paddingText}></Text>
                <View style={styles.columnContainer}>

                    <View>
                        <TouchableWithoutFeedback
                            onPress={this.handlePress}
                        >
                            <Animated.View style={[animatedStyle]}>
                                <Image
                                    source={require('../images/anxiety.png')}
                                    style={styles.image}
                                    resizeMode='cover'
                                />

                            </Animated.View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.isImagePressed ? this.renderOverlay() : null
                        }
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={this.handlePress}
                        >
                            <Animated.View style={[animatedStyle]}>
                                <Image
                                    source={require('../images/stress.png')}
                                    style={styles.image}
                                    resizeMode='cover'
                                />

                            </Animated.View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.isImagePressed ? this.renderOverlay() : null
                        }
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={this.handlePress}
                        >
                            <Animated.View style={[animatedStyle]}>
                                <Image
                                    source={require('../images/depression.png')}
                                    style={styles.image}
                                    resizeMode='cover'
                                />

                            </Animated.View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.isImagePressed ? this.renderOverlay() : null
                        }
                    </View>
                </View>

            </View >

        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8EBCEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',

    },
    heading: {
        marginTop: RFValue(-400),
        fontSize: RFValue(35),
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center',

    },

    paddingText: {
        //  marginTop: RFValue(50)
        // paddingBottom: '10%',

    },
    image: {

        width: 230,
        height: 138,



    },
    overlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

    },
    checkBoxImg: {
        left: -90,
        right: 0,
        top: -50,
        bottom: 0,
        width: 20,
        height: 20,
    },
    text: {
        fontSize: RFValue(27),
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center',


    },

})
