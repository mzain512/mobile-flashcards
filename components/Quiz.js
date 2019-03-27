import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { white, purple } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

const SHOW_ANSWER = 'Show Answer'
const SHOW_QUESTION = 'Show Question'
const RESTART_QUIZ = 'Restart Quiz'
const GO_BACK = 'Go back'
const CORRECT = 'Correct'

class Quiz extends React.Component {


    state = {
        primaryActionBtn: SHOW_ANSWER,
        currentQuestionNumber: 0,
        score: 0,
        hideIncorrectBtn: false,
        secondaryActionBtn: CORRECT,
    }

    handleChangingText = () => {
        const { primaryActionBtn } = this.state
        if (primaryActionBtn === SHOW_ANSWER) {
            this.setState({
                primaryActionBtn: SHOW_QUESTION
            })
        } else if (primaryActionBtn === SHOW_QUESTION) {
            this.setState({
                primaryActionBtn: SHOW_ANSWER
            })
        } else if (primaryActionBtn === RESTART_QUIZ) {
            this.setState({
                primaryActionBtn: SHOW_ANSWER,
                currentQuestionNumber: 0,
                score: 0,
                hideIncorrectBtn: false,
                secondaryActionBtn: CORRECT,
            })
        }
    }

    handleCorrectBtnSubmission = () => {
        const { totalQuestions } = this.props
        const { currentQuestionNumber, score, secondaryActionBtn } = this.state
        if (secondaryActionBtn === CORRECT) {
            if ((currentQuestionNumber + 1) < totalQuestions) {
                this.setState({
                    currentQuestionNumber: currentQuestionNumber + 1,
                    score: score + 1,
                    primaryActionBtn: SHOW_ANSWER,
                })
            } else {
                this.setState({
                    score: score + 1,
                    primaryActionBtn: RESTART_QUIZ,
                    hideIncorrectBtn: true,
                    secondaryActionBtn: GO_BACK,
                })
            }
        } else {
            this.props.navigation.goBack()
        }
    }

    handleIncorrectBtnSubmission = () => {
        const { totalQuestions } = this.props
        const { currentQuestionNumber } = this.state
        if ((currentQuestionNumber + 1) < totalQuestions) {
            this.setState({
                currentQuestionNumber: currentQuestionNumber + 1,
                primaryActionBtn: SHOW_ANSWER,
            })
        } else {
            this.setState({
                primaryActionBtn: RESTART_QUIZ,
                hideIncorrectBtn: true,
                secondaryActionBtn: GO_BACK,
            })
        }
    }

    render() {
        const { isQuizAvailable, deck, totalQuestions } = this.props
        const { primaryActionBtn,
            currentQuestionNumber,
            score,
            hideIncorrectBtn,
            secondaryActionBtn
        } = this.state

        if (!isQuizAvailable) {
            return (
                <View style={styles.center}>
                    <Text style={{ fontSize: 20, fontWeight: '400' }}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        } else {
            if (primaryActionBtn === SHOW_ANSWER) {
                this.currentTextDisplayed = deck.questions[currentQuestionNumber].question
            } else if (primaryActionBtn === SHOW_QUESTION) {
                this.currentTextDisplayed = deck.questions[currentQuestionNumber].answer
            } else if (primaryActionBtn === RESTART_QUIZ) {
                this.currentTextDisplayed = 'You scored ' + ((score / totalQuestions) * 100).toFixed(1) + '%'
                clearLocalNotification()
                    .then(() => {
                        setLocalNotification(1)
                    })
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.cardNo}>
                    <Text style={styles.cardNoText}>
                        {(currentQuestionNumber + 1) + '/' + totalQuestions}
                    </Text>
                </View>
                <View style={styles.quizView}>
                    <View style={styles.questionCard}>
                        <Text style={styles.questionText}>{this.currentTextDisplayed}</Text>
                    </View>
                    <Button style={styles.btn} block dark onPress={() => { this.handleChangingText() }}>
                        <Text style={{ color: white }}>{primaryActionBtn}</Text>
                    </Button>
                    <Button style={styles.btn} block success onPress={this.handleCorrectBtnSubmission}>
                        <Text style={{ color: white }}>{secondaryActionBtn}</Text>
                    </Button>
                    {!hideIncorrectBtn && (
                        <Button style={styles.btn} block danger onPress={this.handleIncorrectBtnSubmission}>
                            <Text style={{ color: white }}>Incorrect</Text>
                        </Button>
                    )}
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.1 }} />
                </View>

            </View>
        )
    }
}


function mapStateToProps(_, props) {
    const deck = props.navigation.state.params.deck
    return {
        isQuizAvailable: deck.questions.length === 0 ? false : true,
        deck: deck,
        totalQuestions: deck.questions.length,

    }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardNo: {
        flex: 0.08,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
    },

    cardNoText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    quizView: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
    },

    questionCard: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        borderColor: purple,
        borderRadius: 3,
        borderWidth: 3,
    },

    btn: {
        marginLeft: 20,
        marginRight: 20,
    },

    questionText: {
        color: purple,
        fontSize: 24,
        fontWeight: "bold",
    }
})
