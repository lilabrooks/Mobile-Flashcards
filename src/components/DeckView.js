import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

export default class DeckView extends React.Component {
  render () {
    const {title, questions} = this.props

    return <View style={styles.deck}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, paddingBottom: 5}}>{title}</Text>
        <Text style={{fontSize: 18, color: Colors.Black}}>
          {questions && questions.length} Cards in this Deck
        </Text>
      </View>
      <Ionicons name="ios-arrow-forward" size={ 36 } color={ Colors.Green } style={{ paddingLeft: 12 }} />
    </View>
  }
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 12,
    height: 120,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
