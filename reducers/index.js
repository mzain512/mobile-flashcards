import { 
    RECEIVE_DECKS, 
    ADD_DECK, 
    ADD_QUESTION, 
    REMOVE_DECK 
} from '../actions/index'
import { combineReducers } from 'redux'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck,
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deck.title]: {
                    ...action.deck,
                    'questions': action.deck.questions.concat(action.question)
                }
            }
        case REMOVE_DECK:
            delete state[action.deckId]
            return {
                ...state,
            }
        default:
            return state
    }
}
export default combineReducers({ decks })