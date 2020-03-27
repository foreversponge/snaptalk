import FirebaseKeys from "./config";
import firebase from 'firebase';
require("firebase/firestore");

class Fire {

    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }


    addPost = async ({ text, localUri, postKey }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/' + this.uid + '/' + Date.now());

        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathName = new firebase.firestore.FieldPath('name');

        const userAgain = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathProfilePicture = new firebase.firestore.FieldPath('profilePicture');

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                postKey: '',
                timestamp: this.timestamp,
                image: remoteUri,
                username: user.get(fieldPathName),
                avatar: userAgain.get(fieldPathProfilePicture),
                listOfComments: [],
                nbOfComments: 0,
                listOfLikes: [],
                nbOfLikes: 0,
            })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                })
        })
    };

    updateUserLikedList = async (postId) => {
        let db = this.firestore.collection("posts").doc(postId);

        const post = await firebase.firestore().collection("posts").doc(postId).get();
        const fieldPathListOfLikes = new firebase.firestore.FieldPath('listOfLikes');
        const arrayOfLikes = await post.get(fieldPathListOfLikes)

        if (arrayOfLikes.includes(this.uid)) {
            db.update({
                listOfLikes: firebase.firestore.FieldValue.arrayRemove(this.uid),
            })
        }
        else {
            db.update({
                listOfLikes: firebase.firestore.FieldValue.arrayUnion(this.uid),
            })
        }
    }



    addPostKey = async (postId) => {

        let dbPost = this.firestore.collection("posts").doc(postId);

        if (postId) {
            dbPost.update({
                postKey: postId
            })
        }
    };

    updatePostList = async (postId) => {
        let db = this.firestore.collection("users").doc(this.uid);

        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathListOfPosts = new firebase.firestore.FieldPath('listOfPosts');

        if (postId) {
            db.update({
                listOfPosts: firebase.firestore.FieldValue.arrayUnion(postId)
            })

            const nbOfPosts = await user.get(fieldPathListOfPosts).length + 1;

            db.set(
                { nbOfPosts: nbOfPosts }, { merge: true }
            )
        }
    }

    addComment = async ({ text, postKey }) => {
        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathName = new firebase.firestore.FieldPath('name');

        const userAgain = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathProfilePicture = new firebase.firestore.FieldPath('profilePicture');

        return new Promise((res, rej) => {
            this.firestore.collection("comments").add({
                comment: text,
                uid: this.uid,
                timestamp: this.timestamp,
                username: user.get(fieldPathName),
                postKey: postKey,
                commentKey: '',
                avatar: userAgain.get(fieldPathProfilePicture)
            })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                })
        })
    };

    addCommentKey = async (commentId) => {

        let dbComment = this.firestore.collection("comments").doc(commentId);

        if (commentId) {
            dbComment.update({
                commentKey: commentId
            })
        }
    };

    updateCommentList = async ({ commentId, postId }) => {
        let dbUser = this.firestore.collection("users").doc(this.uid);

        let dbPost = this.firestore.collection("posts").doc(postId);

        const user = await firebase.firestore().collection("users").doc(this.uid).get();

        const fieldPathListOfComments = new firebase.firestore.FieldPath('listOfComments');

        if (commentId) {
            dbUser.update({
                listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId)
            })

            const nbOfComments = await user.get(fieldPathListOfComments).length + 1;

            dbUser.set(
                { nbOfComments: nbOfComments }, { merge: true }
            )
        }

        if (postId) {
            dbPost.update({
                listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId)
            })

            const nbOfComments = await user.get(fieldPathListOfComments).length + 1;

            dbPost.set(
                { nbOfComments: nbOfComments }, { merge: true }
            )
        }
    }

    createUser = async user => {
        let remoteAvatarUri = null

        try {
            if (!user.name) {
                throw new Error("Username was not entered.")
            }

            await this.firestore
                .collection("users")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        if (user.name == doc.data().name) {
                            throw new Error("Username already taken.")
                        }
                    })
                })

            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                listOfFollowers: [],
                listOfFollowing: [],
                listOfPosts: [],
                listOfComments: [],
                nbOfPosts: 0,
                nbOfComments: 0,
                profilePicture: remoteAvatarUri
            });

            if (user.avatar) {
                remoteAvatarUri = await this.uploadPhotoAsync(user.avatar, 'avatar/' + this.uid);
                db.set({ profilePicture: remoteAvatarUri }, { merge: true })
            }

        } catch (error) {
            alert("Error: " + error.message);
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

            upload.on("state_changed", snapshot => { }, err => {
                rej(err);
            },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };


    get firestore() {
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