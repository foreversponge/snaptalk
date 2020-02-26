import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfilePage from './components/ProfilePage';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBKiZ9_vygXMXTQ14dya5H10EplqqcjYBs",
  authDomain: "snaptalk-4d93d.firebaseapp.com",
  databaseURL: "https://snaptalk-4d93d.firebaseio.com",
  projectId: "snaptalk-4d93d",
  storageBucket: "snaptalk-4d93d.appspot.com",
  messagingSenderId: "",
  appId: "1:925695837279:android:1243e01eac671c687647ea"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator(
  {
    Home: ProfilePage
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
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);

