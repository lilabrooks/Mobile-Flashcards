import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'

export const STORAGE_KEY = 'STORAGE_KEY'
const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

const initData = {
  React: {
    title: 'React',
    questions: [{
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [{
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }]
  }
}

export function fetchDecks () {
  /* toggle comment here to clear local storage if needed.... */
  /* AsyncStorage.clear() */
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    return results === null
      ? initialData()
      : JSON.parse(results)
  })
}

export function createDeck (deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function addCardForDeck ({card, deckName}) {
  return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    let decks = JSON.parse(result)

    let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions))
    newQuestions[newQuestions.length] = card

    const value = JSON.stringify({
      [deckName]: {title: deckName, questions: newQuestions}
    })

    AsyncStorage.mergeItem(STORAGE_KEY, value)
  })
}

export function initialData () {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData))
  return initData
}

function createNotification () {
  return {
    title: 'Take a Quiz',
    body: "👋 don't forget to take a quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true
    }
  }
}

export function setNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (!data) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
                .then(() => {
                  let today = new Date()
                  today.setDate(today.getDate())
                  today.setHours(23, 0, 0)

                  const notification = createNotification()

                  Notifications.scheduleLocalNotificationAsync(notification, {
                    time: today,
                    repeat: 'day'
                  }).then(result => {

                  })
                })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
