import { setDeck } from '../utils/api'

const persistence = (store) => (next) => (action) => {
  const returnValue = next(action)
  setDeck(store.getState().decks)
  return returnValue
}

export default persistence