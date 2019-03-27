export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
    return {
        type:RECEIVE_DECKS,
        decks,
    }
}

export function addDeck(deck) {
    return {
        type:ADD_DECK,
        deck,
    }
}

export function addQuestion(deck , question) {
    return {
        type:ADD_QUESTION,
        question,
        deck,
    }
}

export function removeDeck(deckId) {
    return {
        type:REMOVE_DECK,
        deckId,
    }
}