import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID} from 'react-native-dotenv';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfilePage from './components/ProfilePage';

import * as firebase from 'firebase';

const API_KEY = FIREBASE_API_KEY;
const AUTH_DOMAIN = FIREBASE_AUTH_DOMAIN;
const DATABASE_URL = FIREBASE_DATABASE_URL;
const PROJECT_ID = FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;
const APP_ID = FIREBASE_APP_ID;

var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: "",
  appId: APP_ID
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

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
