import React from 'react'
import { Alert, View, KeyboardAvoidingView } from 'react-native'
import { Input, Item, Text, Button } from 'native-base'
import { addCard } from '../actions/index'
import { connect } from 'react-redux'
import { addCardForDeck } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

class NewCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    submitQuestion = () => {
        const {question, answer} = this.state
        const {title, questions} = this.props.navigation.state.params

        if (question === '') {
            Alert.alert('⛔ Question is mandatory!', 'Please specify a question...')
            return
        }
        if (answer === '') {
            Alert.alert('⛔ Answer is mandatory!', 'Please specify an answer...')
            return
        }

        const params = {title, questions, question, answer}

        this.props.dispatch(addCard(params))

        addCardForDeck({
            card: {question, answer},
            deckName: title
        })

        Alert.alert('✅ OK', 'Card successfully added. ',
            [
                {
                    text: 'OK', onPress: () =>
                        this.props.navigation.goBack()
                }
            ],)
    }

    render() {

        const {question, answer} = this.state

        return (


            <KeyboardAvoidingView behavior="padding" style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: Colors.Grey
            }}>

                <View style={{ paddingBottom: 25, paddingTop: 50 }}>
                    <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 28 }} >Add A New Card</Text>
                </View>


                <View style={{ marginTop: 30 }}>
                    <Item regular style={{ width: 325 }}>
                        <Input
                            style={{ backgroundColor: Colors.White }}
                            placeholder='Question'
                            value={question}
                            onChangeText={question => this.setState({question})}/>
                    </Item>
                </View>


                <View style={{ marginTop: 30 }}>
                    <Item regular style={{ width: 325 }}>
                        <Input
                            style={{ backgroundColor: Colors.White }}
                            placeholder='Answer'
                            value={answer}
                            onChangeText={answer => this.setState({answer})}/>
                    </Item>
                </View>


                <View style={{ marginTop: 40 }}>
                    <Button bordered style={{ backgroundColor: Colors.White, width: 200, height: 55, borderRadius: 12 }}
                            onPress={this.submitQuestion}
                    >
                        <Ionicons name="ios-add-circle" size={ 38 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
                        <Text> Add </Text>
                    </Button>
                </View>


</KeyboardAvoidingView>

        )
    }
}


function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(NewCard)
