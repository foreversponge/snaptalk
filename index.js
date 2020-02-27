/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);

import Firebase from "firebase"
const FBconfig = {
    apiKey: "AIzaSyBKiZ9_vygXMXTQ14dya5H10EplqqcjYBs",
    databaseURL: "https://console.firebase.google.com/u/0/project/snaptalk-4d93d/database",
    projectId: "snaptalk-4d93d",
    appId: "1:925695837279:android:1243e01eac671c687647ea",
};
//firebase.initializeApp(FBconfig);
