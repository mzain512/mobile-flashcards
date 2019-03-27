import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, gray, white } from '../utils/colors'
import { Button } from 'native-base'
import { removeDeck } from "../actions/index";
class DeckDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.deckId
        };
    };

    addCard = () => {
        const { deck } = this.props
        this.props.navigation.navigate('AddCard', {
            deckId: deck.title
        })
    }

    quiz = () => {
        const { navigation, deck } = this.props
        navigation.navigate('Quiz', {
            deck: deck,
        })
    }

    deleteDeck = () => {
        const { dispatch, deck, navigation } = this.props
        dispatch(removeDeck(deck.title))
        navigation.goBack()
    }


    render() {
        const { deck } = this.props
        if (deck === undefined) {
            return <View />
        }
        return (
            <View style={styles.deckDetails}>
                <View style={styles.center}>
                    <Text style={styles.deckName}>{deck.title}</Text>
                    <Text style={styles.cardNumber}>{deck.questions.length + ' cards'}</Text>
                </View>
                <View style={styles.btnView} >
                    <Button block style={styles.btn} onPress={this.addCard} >
                        <Text style={{ color: white }}>
                            Add Card
                    </Text>
                    </Button>
                    <Button block style={styles.btn} onPress={this.quiz} >
                        <Text style={{ color: white }}>
                            Start Quiz
                    </Text>
                    </Button>
                    <Button block danger style={styles.btn} onPress={this.deleteDeck} >
                        <Text style={{ color: white }}>
                            Delete Deck
                    </Text>
                    </Button>
                </View>
            </View>

        )
    }
}

function mapStateToProps({ decks }, props) {
    return {
        deck: decks[props.navigation.state.params.deckId]
    }
}

export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({

    deckName: {
        color: purple,
        fontSize: 28,
        fontWeight: "bold",
    },

    cardNumber: {
        color: gray,
        fontSize: 20,
        fontWeight: '400',
    },

    details: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },

    deckDetails: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    btnView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn: {
        margin: 10,
    }
})