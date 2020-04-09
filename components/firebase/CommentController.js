import FirebaseKeys from './Config';
import firebase from 'firebase';
require('firebase/firestore');

class CommentController {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
    }
  }

  verifyValidComment = text => {
    if (text.trim() === '') {
      throw new Error('Comment is blank.');
    }

    if (text.length > 199) {
      throw new Error('Comment should be shorter than 200 characters.');
    }
  };

  addComment = async ({text, postKey}) => {
    this.verifyValidComment(text);

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
    const fieldPathProfilePicture = new firebase.firestore.FieldPath(
      'profilePicture',
    );

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

  updateCommentList = async ({commentId, postId}) => {
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
    const fieldPathListOfComments = new firebase.firestore.FieldPath(
      'listOfComments',
    );

    if (commentId) {
      dbUser.update({
        listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId),
      });

      const nbOfComments = (await user.get(fieldPathListOfComments).length) + 1;

      dbUser.set({nbOfComments: nbOfComments}, {merge: true});
    }

    if (postId) {
      dbPost.update({
        listOfComments: firebase.firestore.FieldValue.arrayUnion(commentId),
      });

      const nbOfComments = (await post.get(fieldPathListOfComments).length) + 1;

      dbPost.set({nbOfComments: nbOfComments}, {merge: true});
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
    const fieldPathListOfComments = new firebase.firestore.FieldPath(
      'listOfComments',
    );

    if (commentId) {
      dbComments.delete();

      dbUser.update({
        listOfComments: firebase.firestore.FieldValue.arrayRemove(commentId),
      });

      const nbOfComments = (await user.get(fieldPathListOfComments).length) - 1;

      dbUser.set({nbOfComments: nbOfComments}, {merge: true});
    }

    if (postId) {
      dbPost.update({
        listOfComments: firebase.firestore.FieldValue.arrayRemove(commentId),
      });

      const nbOfComments = (await post.get(fieldPathListOfComments).length) - 1;

      dbPost.set({nbOfComments: nbOfComments}, {merge: true});
    }
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

CommentController.shared = new CommentController();
export default CommentController;
