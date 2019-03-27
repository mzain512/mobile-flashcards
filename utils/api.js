import { AsyncStorage } from "react-native";
import { STORAGE_KEY } from './helper'


export function setDeck(data) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}


export function fetchDecks() {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY).then((results) => {
            const data = JSON.parse(results)
            if (data === null) {
                res(null)
            } else {
                res(data)
            }
        })
    })
}
