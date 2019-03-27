import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Label, Item, Input } from "native-base";
import { white } from '../utils/colors'
import { addQuestion } from "../actions/index";

class AddCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const { deck, dispatch , navigation} = this.props
        dispatch(addQuestion(deck,{
            question: this.state.question,
            answer: this.state.answer
        }))
        navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fieldsView}>
                    <Item floatingLabel >
                        <Label>Question</Label>
                        <Input value={this.state.question}
                            onChangeText={(text) => this.setState({ question: text })} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Answer</Label>
                        <Input value={this.state.answer}
                            onChangeText={(text) => this.setState({ answer: text })} />
                    </Item>
                </View>
                <Button block dark style={styles.btn}
                    onPress={this.submit}
                    disabled={this.state.question === '' || this.state.answer === ''}>
                    <Text style={{ color: white }}>
                        Submit
                    </Text>
                </Button>
            </View>
        )
    }
}

function mapStateToProps({ decks }, props) {
    return {
        deck: decks[props.navigation.state.params.deckId]
    }
}

export default connect(mapStateToProps)(AddCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    fieldsView: {
        flex: 0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },

    btn: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    }
})