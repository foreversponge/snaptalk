import FirebaseKeys from "./config";
import firebase from 'firebase';
import { useTheme } from "react-navigation";
require("firebase/firestore");

class Fire {

    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }


    addPost = async({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/'+this.uid+'/'+Date.now());

        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathName = new firebase.firestore.FieldPath('name');

        const userAgain = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathProfilePicture = new firebase.firestore.FieldPath('profilePicture');

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
                username: user.get(fieldPathName),
                avatar: userAgain.get(fieldPathProfilePicture)
            })
            .then( ref=> {
                res(ref);
            })
            .catch(error => {
                rej(error);
            })
        })
    };

    updatePostList = async (postId) =>
    {
        let db = this.firestore.collection("users").doc(this.uid);

        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathListOfPosts = new firebase.firestore.FieldPath('listOfPosts');

        if(postId)
        {
            db.update({
                listOfPosts: firebase.firestore.FieldValue.arrayUnion(postId)
            })

            const nbOfPosts = await user.get(fieldPathListOfPosts).length + 1;
            
            db.set(
                {nbOfPosts: nbOfPosts}, {merge: true}
            )
        }
    }

    createUser = async user => {
        let remoteAvatarUri = null

        try{

            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(error => re.setState({errorMessage: error.message}));

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                listOfFollowers: [],
                listOfFollowing: [],
                listOfPosts: [],
                nbOfPosts: 0,
                profilePicture: remoteAvatarUri
            });

            if(user.avatar)
            {
                remoteAvatarUri = await this.uploadPhotoAsync(user.avatar, 'avatar/'+this.uid);
                db.set({profilePicture: remoteAvatarUri}, {merge: true})
            }

        } catch(error){
            alert("Error: Format is wrong.");
       }
    }

    uploadPhotoAsync = async (uri, filename) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on("state_changed", snapshot => {}, err => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
        );
    });
};
    

    get firestore(){
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}




Fire.shared = new Fire();
export default Fire;