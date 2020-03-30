import FirebaseKeys from './Config';
import firebase from 'firebase';
require('firebase/firestore');

class Fire {

  constructor() {
    firebase.initializeApp(FirebaseKeys);
  }

  addPost = async ({ text, localUri, postKey }) => {
    //Uploading picture to database
    const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/' + this.uid + '/' + Date.now());

    //Getting User from database
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Pointer to the name field of the user in the database
    const fieldPathName = new firebase.firestore.FieldPath('name');

    //Getting User from database again (because cannot use the same variable)
    const userAgain = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Pointer to the profile picture field of the user in the database
    const fieldPathProfilePicture = new firebase.firestore.FieldPath('profilePicture');

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

  updateUserLikedList = async postId => {
    //Getting post from the database
    let db = this.firestore.collection('posts').doc(postId);

    //Getting post from the database
    const post = await firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .get();

    //Creating pointer to the list Of likes of the post in the database
    const fieldPathListOfLikes = new firebase.firestore.FieldPath('listOfLikes');

    //Getting the list of likes of the post from the database
    const arrayOfLikes = await post.get(fieldPathListOfLikes);

    if (arrayOfLikes.includes(this.uid)) {
      db.update({
        listOfLikes: firebase.firestore.FieldValue.arrayRemove(this.uid),
      });
    }
    else {
      db.update({
        listOfLikes: firebase.firestore.FieldValue.arrayUnion(this.uid),
      });
    }
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

  updatePostList = async postId => {
    //Getting user from the database
    let db = this.firestore.collection('users').doc(this.uid);

    //Getting user from the database
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Creating pointer to the list of posts field in the database
    const fieldPathListOfPosts = new firebase.firestore.FieldPath('listOfPosts');

    if (postId) {
      db.update({
        listOfPosts: firebase.firestore.FieldValue.arrayUnion(postId),
      });

      const nbOfPosts = (await user.get(fieldPathListOfPosts).length) + 1;

      db.set({ nbOfPosts: nbOfPosts }, { merge: true });
    }
  };

  addComment = async ({ text, postKey }) => {
    //Getting user from database
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Creating a pointer to name field of the user in the database
    const fieldPathName = new firebase.firestore.FieldPath('name');

    //Getting User from database again (because cannot use the same variable)
    const userAgain = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Creating a pointer to the profile picture field in the database
    const fieldPathProfilePicture = new firebase.firestore.FieldPath('profilePicture');

    return new Promise((res, rej) => {
      this.firestore
        .collection('comments')
        .add({
          comment: text,
          uid: this.uid,
          timestamp: this.timestamp,
          username: user.get(fieldPathName),
          postKey: postKey,
          commentKey: '',
          avatar: userAgain.get(fieldPathProfilePicture),
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  addCommentKey = async commentId => {
    //Getting comments from database
    let dbComment = this.firestore.collection('comments').doc(commentId);

    if (commentId) {
      dbComment.update({
        commentKey: commentId,
      });
    }
  };

  updateCommentList = async ({ commentId, postId }) => {
    //Getting user from database
    let dbUser = this.firestore.collection('users').doc(this.uid);

    //Getting post from database
    let dbPost = this.firestore.collection('posts').doc(postId);

    //Getting post again from database
    const post = await firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .get();

    //Getting user again from database
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Creating pointer to the list of comments field in the database
    const fieldPathListOfComments = new firebase.firestore.FieldPath('listOfComments');

    if (commentId) {
      dbUser.update({
        listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId),
      });

      const nbOfComments = (await user.get(fieldPathListOfComments).length) + 1;

      dbUser.set({ nbOfComments: nbOfComments }, { merge: true });
    }

    if (postId) {
      dbPost.update({
        listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId)
      });

      const nbOfComments = (await post.get(fieldPathListOfComments).length) + 1;

      dbPost.set({ nbOfComments: nbOfComments }, { merge: true });
    }
  };

  modifyComment = async (commentKey, newComment) => {
    //Getting comments from database
    let dbComment = this.firestore.collection('comments').doc(commentKey);

    if (commentKey) {
      dbComment.update({
        comment: newComment,
      });
    }
  };

  deleteComment = async (commentId, postId) => {

    //Getting comment from database
    let dbComments = this.firestore.collection('comments').doc(commentId);

    //Getting user from database
    let dbUser = this.firestore.collection('users').doc(this.uid);

    //Getting post from database
    let dbPost = this.firestore.collection('posts').doc(postId);

    //Getting post again from database
    const post = await firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .get();

    //Getting user again from database
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(this.uid)
      .get();

    //Creating pointer to the list of comments field in the database
    const fieldPathListOfComments = new firebase.firestore.FieldPath('listOfComments');

    if (commentId) {

      dbComments.delete();

      dbUser.update({
        listOfComments: firebase.firestore.FieldValue.arrayRemove(commentId)
      });

      const nbOfComments = (await user.get(fieldPathListOfComments).length) - 1;

      dbUser.set({ nbOfComments: nbOfComments }, { merge: true });
    }

    if (postId) {
      dbPost.update({
        listOfComments: firebase.firestore.FieldValue.arrayRemove(commentId),
      });

      const nbOfComments = (await post.get(fieldPathListOfComments).length) - 1;

      dbPost.set({ nbOfComments: nbOfComments }, { merge: true });
    }
  };



  createUser = async user => {
    let remoteAvatarUri = null;

    try {

      if (!user.name) {
        throw new Error('Username was not entered.');
      }

      await this.firestore
        .collection('users')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (user.name == doc.data().name) {
              throw new Error('Username already taken.');
            }
          });
        });

      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection('users').doc(this.uid);

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
        remoteAvatarUri = await this.uploadPhotoAsync(
          user.avatar,
          'avatar/' + this.uid,
        );
        db.set({ profilePicture: remoteAvatarUri }, { merge: true });
      }

    }
    catch (error) {
      alert('Error: ' + error.message);
    }
  };

  uploadPhotoAsync = async (uri, filename) => {
    //Uploading picture to firebase storage
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
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