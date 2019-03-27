import React from "react"
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { purple, gray } from "../utils/colors";

class Decks extends React.Component {

    itemTap = (deckId) => {
        this.props.navigation.navigate('DeckDetails', {
            deckId: deckId,
        })
    }

    render() {
        const { decks, areDecksAvailable } = this.props
        if (!areDecksAvailable) {
            return (
                <View style={styles.center}>
                    <Text style={{ fontSize: 20, fontWeight: '400' }}>No deck exists</Text>
                </View>
            )
        }
        return (
            <FlatList
                data={Object.values(decks).map((item) => ({ deck: item, key: item.title }))}
                renderItem={({ item }) => <DeckCard title={item.deck.title}
                    cards={item.deck.questions.length} itemTap={this.itemTap} />} />

        )
    }
}

function DeckCard(props) {
    return (
        <TouchableOpacity style={styles.deckCard} onPress={() => {
            props.itemTap(props.title)
        }}>
            <Text style={styles.deckName}>{props.title}</Text>
            <Text style={styles.cardNumber}>{props.cards + ' cards'}</Text>
        </TouchableOpacity>
    )
}

function mapStateToProps({ decks }) {
    return {
        decks,
        areDecksAvailable: Object.keys(decks).length === 0 ? false : true,
    }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deckCard: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 170,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },

    deckName: {
        color: purple,
        fontSize: 28,
        fontWeight: "bold",
    },
    cardNumber: {
        color: gray,
        fontSize: 20,
        fontWeight: '400',
    }

})
