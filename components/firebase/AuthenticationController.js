import FirebaseKeys from './Config';
import Firebase from 'firebase';
require('firebase/firestore');

class AuthenticationController {
  constructor() {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseKeys);
    }
  }

  createUser = async user => {
    this.verifyValidUsername(user);

    await this.verifyUserAlreadyExist(user);

    await Firebase.auth().createUserWithEmailAndPassword(
      user.email,
      user.password,
    );

    await this.storeUserInDatabase(user);
  };

  verifyValidUsername = user => {
    let usernameRegex = /(?!.*\.\.)(?!.*\.$)[^\W][\w.]+/;

    if (!user.name) {
      throw new Error('Username was not entered.');
    }

    if (!user.name.match(usernameRegex) || user.name.length > 20) {
      throw new Error('Username must only contain 20 letters and/or numbers.');
    }
  };

  verifyUserAlreadyExist = async user => {
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
  };

  storeUserInDatabase = async user => {
    let remoteAvatarUri = null;

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
      profilePicture: remoteAvatarUri,
      uid: this.uid,
    });

    if (user.avatar) {
      remoteAvatarUri = await this.uploadPhotoAsync(
        user.avatar,
        'avatar/' + this.uid,
      );
      db.set({profilePicture: remoteAvatarUri}, {merge: true});
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

AuthenticationController.shared = new AuthenticationController();
export default AuthenticationController;
