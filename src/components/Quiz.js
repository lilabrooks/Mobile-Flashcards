import React from 'react'
import {View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

export default class Quiz extends React.Component {

    state = {
        counter: 0,
        correct: 0,
        showAnswer: false,
    }

    handleCorrect = () => {
        const {counter, correct} = this.state
        this.setState({counter: counter + 1, correct: correct + 1, showAnswer: false})
    }

    handleIncorrect = () => {
        this.setState({counter: this.state.counter + 1})
    }

    handleQuiz = () => {
        this.setState({counter: 0, correct: 0, showAnswer: false})
    }

    toDeck = () => {
        this.props.navigation.goBack()

    }

    showAnswer = () => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    render() {
        const { counter, correct, showAnswer } = this.state
        const { questions } = this.props.navigation.state.params
        const remainingQuestions = questions.length - counter
        let incorrect = questions.length - this.state.correct
        let score = ((correct / (this.state.correct + incorrect)) *100).toFixed(0)

        return (
            <View style={{flex: 1}}>
                { counter < questions.length ? (
                    <View style={styles.container}>

                        <View style={{justifyContent: 'flex-start', paddingTop: 45}}>
                            <Text>Question {remainingQuestions} of {questions.length}</Text>
                        </View>


                        <View style={{flex: 1, justifyContent: 'space-around'}}>
                            <View>
                                {showAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[counter].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: Colors.Green}}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[counter].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: Colors.Red}}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <Button
                                    style={{ backgroundColor: Colors.White, borderRadius: 10, width: 175 }}
                                    bordered success
                                    onPress={ this.handleCorrect }>
                                    <Ionicons name="ios-checkmark-circle" size={ 22 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
                                    <Text style={{ paddingRight: 33 }}>Correct</Text>
                                </Button>


                                <Button
                                    bordered danger
                                    style={{ backgroundColor: Colors.White, borderRadius: 10, width: 175, marginTop: 30 }}
                                    onPress={ this.handleIncorrect }>
                                    <Ionicons name="ios-close-circle" size={ 22 } color={ Colors.Red } style={{ paddingLeft: 25 }} />
                                    <Text style={{ paddingRight: 25 }}>Incorrect</Text>
                                </Button>

                            </View>

                        </View>

                    </View>

                ) : (
                    <View style={[styles.container, { paddingTop: 45 } ]}>
                        <Text style={{ fontWeight:'bold' }}>Your Score is: { score }%.</Text>
                        <Text style={{ paddingTop: 20 }}>You had { incorrect } incorrect answers.</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>

                        <View style={styles.container}>

                                <Button
                                    style={{ backgroundColor: Colors.White, borderRadius: 10, width: 255 }}
                                    bordered success
                                    onPress={ this.handleQuiz }>
                                    <Ionicons name="ios-game-controller-b" size={ 22 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
                                    <Text style={{ paddingRight: 10 }}>Start Another Quiz</Text>
                                </Button>


                                <Button
                                    style={{ backgroundColor: Colors.White, borderRadius: 10, width: 255, marginTop: 45 }}
                                    bordered success
                                    onPress={ this.toDeck }>
                                    <Ionicons name="ios-apps" size={ 22 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
                                    <Text style={{ paddingRight: 22 }}>Show This Deck</Text>
                                </Button>
                                
                                

                            </View>

                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    }
})
