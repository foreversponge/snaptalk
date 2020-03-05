import FirebaseKeys from "./config";
import firebase from 'firebase';
require("firebase/firestore");

class Fire {

    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }

    addPost = async({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/${this.uid}/${Date.now()}');

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
            })
            .then( ref=> {
                res(ref);
            })
            .catch(error => {
                rej(error);
            })
        })
    };


    createUser = async user => {
        let remoteUri = null

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                email: user.email
            });

        } catch(error){
            alert("Error: ", error)
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