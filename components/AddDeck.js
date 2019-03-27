import React from "react"
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Text, Label, Item, Input } from "native-base";
import { connect } from "react-redux";
import { addDeck } from "../actions/index";
class AddDeck extends React.Component {

    state = {
        title: ''
    }
    
    submitTitle = () => {
        const { decksTitles, dispatch } = this.props
        if (!decksTitles.includes(this.state.title)) {
            dispatch(addDeck({
                'title': this.state.title,
                'questions': []
            }))
            this.props.navigation.navigate('DeckDetails', {
                deckId: this.state.title
            })
            this.setState({
                title: ''
            })
        } else {
            alert('Deck with this title already exists')
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
                <Text style={{ fontSize: 24 }}>What is the title of your Deck?</Text>
                <Item floatingLabel >
                    <Label>Deck Title</Label>
                    <Input value={this.state.title} onChangeText={(text) => this.setState({ title: text })} />
                </Item>
                <Button block onPress={this.submitTitle} disabled={this.state.title === ''}>
                    <Text>Create Deck</Text>
                </Button>
                <View style={{flex:0.3}} />
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decksTitles: Object.keys(decks).length === 0 ?  [] : Object.keys(decks)
    }
}

export default connect(mapStateToProps)(AddDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20,
    }
})