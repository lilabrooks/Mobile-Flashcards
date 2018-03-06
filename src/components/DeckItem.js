import React from 'react'
import {connect} from 'react-redux'
import {View } from 'react-native'
import { Button, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

class DeckItem extends React.Component {
  render () {
    let {title} = this.props.navigation.state.params
    const questions = this.props.decks[title] && this.props.decks[title].questions

    return (

      <View style={{ flex: 1, height: 100, paddingTop: 20 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 36}}>{title}</Text>
          <Text style={{fontSize: 22, marginTop: 12}}>{questions.length} Cards Here</Text>
        </View>

        <View style={{ flex: 0.75, alignItems: 'center', justifyContent: 'center', height: 200, marginLeft: 95 }}>

          <Button
            style={{ backgroundColor: Colors.White, borderRadius: 10, width: 225, height: 55 }}
            bordered success
            onPress={() => {
              this.props.navigation.navigate('NewCard', {
                title,
                questions
              })
            }}>
            <Ionicons name="ios-add-circle" size={ 38 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
            <Text style={{ paddingRight: 33 }}>Add Card</Text>
          </Button>

          <Button
            style={{ backgroundColor: Colors.White, borderRadius: 10, width: 225, height: 55, marginTop: 15 }}
            bordered success
            disabled={ this.props.decks[title].questions.length === 0 }
            onPress={() => {
              this.props.navigation.navigate('Quiz', {
                title,
                questions
              })
            }}>
            <Ionicons name="ios-game-controller-a" size={ 48 } color={ Colors.Green } style={{ paddingLeft: 25 }} />
            <Text style={{ paddingRight: 33 }}>Start Quiz</Text>
          </Button>

        </View>

      </View>

    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckItem)
