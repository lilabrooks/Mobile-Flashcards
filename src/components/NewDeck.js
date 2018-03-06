import React from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import { Button, Text, Input, Item } from 'native-base'
import {createDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addDeck} from '../actions/index'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

class AddDeck extends React.Component {
    componentWillMount() {
        this.setState({
            text: ''
        })
    }

    addNewDeck = () => {
        const entry = this.state
        const {decks} = this.props

        if (!entry.text) {
            Alert.alert(
                '⛔ Deck Name is Mandatory',
                'Please specify a name for this deck ... '
            )
        } else {
            if (decks[entry.text]) {
                Alert.alert(
                    '⛔ Duplicate!',
                    'A deck with the same name already exists...'
                )
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: []}}

                this.props.dispatch(addDeck(newDeck))
                createDeck(newDeck)

                Alert.alert(
                    '✅ OK', 'Deck successfully added',
                    [
                        {text: 'OK',
                            onPress: () => this.props.navigation.navigate('DeckItem', {
                            title: entry.text,
                            questions : []
                        })},
                    ],
                )

                this.setState({text: ''})
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>

                <View>
                    <Text style={{
                        fontSize:28,
                        fontWeight:"bold",
                        alignItems:"center",
                        width: 325
                    }}>
                        What is the title of your new Deck?
                    </Text>
                </View>

                <View>
                    <Item regular style={{
                        marginTop:15,
                        marginBottom:10,
                        width: 300, borderRadius: 12
                    }}>
                        <Input style={{ color: Colors.Black , backgroundColor: Colors.White, borderRadius: 12 }}
                               value={this.state.text}
                               placeholder='New Deck Title...'
                               onChangeText={text => this.setState({text})}/>
                    </Item>
                </View>


<View>

    <Button
        style={{ backgroundColor: Colors.White, borderRadius: 10, width: 255, marginTop: 45 }}
        bordered success
        onPress={ this.addNewDeck }>
        <Ionicons name="ios-add-circle" size={ 22 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
        <Text style={{ paddingRight: 22 }}>Add Deck</Text>
    </Button>

</View>


            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(AddDeck)
