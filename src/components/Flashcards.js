import React from 'react'
import {View} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/index.js'
import {StackNavigator, TabNavigator} from 'react-navigation'
import {setNotification} from '../utils/api'
import NewDeck from './NewDeck'
import DeckList from './DeckList.js'
import DeckItem from './DeckItem.js'
import NewCard from './NewCard'
import Quiz from './Quiz.js'
import { Ionicons } from '@expo/vector-icons'
import * as Colors from '../utils/colors'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'View Decks',
      headerStyle: { backgroundColor: Colors.Green },
      headerTintColor: Colors.White,
      tabBarIcon: () => <Ionicons name="ios-book" size={ 30 } color={ Colors.Green } />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      headerStyle: { backgroundColor: Colors.Green },
      headerTintColor: Colors.White,
      tabBarIcon: () => <Ionicons name='ios-add-circle' size={ 30 } color={ Colors.Green } />
    }
  }
}
)

const AppNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerTitleStyle: { justifyContent: 'center', color: Colors.White },
      headerStyle: { backgroundColor: Colors.Green },
      headerTintColor: Colors.White
    },
    tintColor: Colors.Green
  },
  DeckItem: {
    screen: DeckItem,
    navigationOptions: {
      headerTintColor: '#000'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Start Quiz',
      headerTitleStyle: { justifyContent: 'center', color: Colors.White },
      headerStyle: { backgroundColor: Colors.Green },
      headerTintColor: Colors.White
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
      headerTitleStyle: { justifyContent: 'center', color: Colors.White },
      headerStyle: { backgroundColor: Colors.White },
      headerTintColor: Colors.Black
    }
  }
})

export default class FlashCards extends React.Component {
  componentDidMount () {
    setNotification()
  }

  render () {
    return <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <AppNavigator style={{backgroundColor: Colors.White}} />
      </View>
    </Provider>
  }
}
