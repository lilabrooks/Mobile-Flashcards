import * as Types from './types'

export const getDecks = decks => ({
  type: Types.GET_DECKS,
  decks
})

export const addDeck = deck => ({
  type: Types.ADD_DECK,
  deck
})

export const addCard = params => ({
  type: Types.ADD_CARD,
  params
})
