import Firebase from "firebase"
const FBconfig = {
    apiKey: "AIzaSyBKiZ9_vygXMXTQ14dya5H10EplqqcjYBs",
    databaseURL: "https://snaptalk-4d93d.firebaseio.com",
    projectId: "snaptalk-4d93d",
    appId: "1:925695837279:android:1243e01eac671c687647ea",
};
//firebase.initializeApp(FBconfig);
const app = Firebase.initializeApp(FBconfig);
export const db = app.database();
//import {db} from 'index';