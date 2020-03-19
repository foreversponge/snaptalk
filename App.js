import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import PostScreen from './components/PostScreen';
import Tabs from './components/NavBar';

import FirebaseKeys from './components/config';

import * as firebase from 'firebase';

console.disableYellowBox = true

if(!firebase.apps.length){
  firebase.initializeApp(FirebaseKeys);
}

const AppContainer = createStackNavigator(
  {
    SnapTalk: Tabs,
    // Post: {
    //   screen: PostScreen
    // }
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
