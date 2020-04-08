import FirebaseKeys from './Config';
import Firebase from 'firebase';
require('firebase/firestore');

class PostController {

    constructor() {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(FirebaseKeys);
        }
    }

    addPost = async ({ text, localUri }) => {

        if (!text) {
            throw new Error('Caption cannot be empty.');
        }

        else if (text.length > 100) {
            throw new Error('Caption must be less than 100 characters.');
        }

        else if (!localUri) {
            throw new Error('You must choose an image.')
        }

        const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/' + this.uid + '/' + Date.now());

        //Getting User from database
        const user = await Firebase
            .firestore()
            .collection('users')
            .doc(this.uid)
            .get();

        //Pointer to the name field of the user in the database
        const fieldPathName = new Firebase.firestore.FieldPath('name');

        //Getting User from database again (because cannot use the same variable)
        const userAgain = await Firebase
            .firestore()
            .collection('users')
            .doc(this.uid)
            .get();

        //Pointer to the profile picture field of the user in the database
        const fieldPathProfilePicture = new Firebase.firestore.FieldPath('profilePicture');

        //Creating a new post in the database
        return new Promise((res, rej) => {
            this.firestore
                .collection('posts')
                .add({
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
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    addPostKey = async postId => {
        //Getting post from database
        let dbPost = this.firestore.collection('posts').doc(postId);

        if (postId) {
            dbPost.update({
                postKey: postId,
            });
        }
    };

    uploadPhotoAsync = async (uri, filename) => {
        //Uploading picture to firebase storage
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = Firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                'state_changed',
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                },
            );
        });
    };


    updateUserLikedList = async postId => {
        //Getting post from the database
        let db = this.firestore.collection('posts').doc(postId);

        //Getting post from the database
        const post = await Firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .get();

        //Creating pointer to the list Of likes of the post in the database
        const fieldPathListOfLikes = new Firebase.firestore.FieldPath('listOfLikes');

        //Getting the list of likes of the post from the database
        const arrayOfLikes = await post.get(fieldPathListOfLikes);

        if (arrayOfLikes.includes(this.uid)) {
            db.update({
                listOfLikes: Firebase.firestore.FieldValue.arrayRemove(this.uid),
            });
        }
        else {
            db.update({
                listOfLikes: Firebase.firestore.FieldValue.arrayUnion(this.uid),
            });
        }
    };

    updatePostList = async postId => {
        //Getting user from the database
        let db = this.firestore.collection('users').doc(this.uid);

        //Getting user from the database
        const user = await Firebase
            .firestore()
            .collection('users')
            .doc(this.uid)
            .get();

        //Creating pointer to the list of posts field in the database
        const fieldPathListOfPosts = new Firebase.firestore.FieldPath('listOfPosts');

        if (postId) {
            db.update({
                listOfPosts: Firebase.firestore.FieldValue.arrayUnion(postId),
            });

            const nbOfPosts = (await user.get(fieldPathListOfPosts).length) + 1;

            db.set({ nbOfPosts: nbOfPosts }, { merge: true });
        }
    };

    get firestore() {
        return Firebase.firestore();
    }

    get uid() {
        return (Firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

PostController.shared = new PostController();
export default PostController;