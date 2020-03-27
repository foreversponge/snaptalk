import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './components/authentication/LoadingScreen';
import LoginScreen from './components/authentication/LoginScreen';
import RegisterScreen from './components/authentication/RegisterScreen';
import Tabs from './components/navigationbar/NavBar';
import FirebaseKeys from './components/firebase/config';
import * as firebase from 'firebase';

console.disableYellowBox = true;

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys);
}

const AppContainer = createStackNavigator(
  {
    SnapTalk: Tabs,
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
