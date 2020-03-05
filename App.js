import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID} from 'react-native-dotenv';




import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import PostScreen from './components/PostScreen';
import Tabs from './components/NavBar';

import FirebaseKeys from './components/config';

import * as firebase from 'firebase';

if(!firebase.apps.length){
  firebase.initializeApp(FirebaseKeys);
}

const AppContainer = createStackNavigator(
  {
    SnapTalk: Tabs,
    Post: {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Post"
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

