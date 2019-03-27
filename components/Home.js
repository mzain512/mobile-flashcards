import React from 'react';
import { View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import Decks from "./Decks";
import AddDeck from "./AddDeck";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'
import { receiveDecks } from "../actions/index";
import { fetchDecks } from '../utils/api';
import DeckDetails from './DeckDetails'
import AddCard from './AddCard'
import Quiz from "./Quiz";
import { setLocalNotification } from "../utils/helper";

function MyStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = createAppContainer(createBottomTabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />,

        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />,
            title: 'Add Deck',
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: purple,
            style: {
                height: 56,
                backgroundColor: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }))

const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: ({ navigation }) => ({
            title: 'Decks',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({ navigation }) => ({
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
}));

class Home extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        fetchDecks().then((data) => {
            dispatch(receiveDecks(data))
            if (data !== null) {
                if (Object.keys(data).length !== 0) {
                    setLocalNotification()
                }
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyStatusBar backgroundColor={purple} barStyle="light-content" />
                <MainNavigator />
            </View>
        );
    }
}

export default connect()(Home)