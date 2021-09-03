import { getError } from '../Errors/index.js';
import { navigation } from '../router.js';

const storage = firebase.storage();

const loginEmailAndPassword = (email, password, checkbox) => {
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => navigation('/feed'));
    }).catch((error) => {
      getError(error);
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => navigation('/feed'));
    }).catch((error) => {
      getError(error);
    });
  }
};

const loginWithGmail = (checkbox) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithPopup(provider).then(() => navigation('/feed'));
    }).catch((error) => {
      getError(error);
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      firebase.auth().signInWithPopup(provider).then(() => navigation('/feed'));
    }).catch((error) => {
      getError(error);
    });
  }
};

const signUpWithEmailAndPassword = (email, password) => firebase
  .auth().createUserWithEmailAndPassword(email, password);

const signOut = () => firebase.auth().signOut();

const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

const currentUser = () => firebase.auth().currentUser;

const createPost = (post) => firebase.firestore().collection('post').add(post);

const getPost = () => firebase.firestore().collection('post').orderBy('date', 'desc').get();

const updatePost = (idPost, post) => firebase.firestore().collection('post').doc(idPost).update({ text: post });

const deletePostFeed = (idPost) => firebase.firestore().collection('post').doc(idPost).delete();

const getLikes = (idPost) => firebase.firestore().collection('post').doc(idPost).get();

const likePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayUnion(idUser) });

const uploadPicture = (log, folder) => storage.ref(`images/${log}`).put(folder);

const downloadPicture = (log) => storage.ref().child(`images/${log}`).getDownloadURL();

const unlikePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayRemove(idUser) });

const createHome = (user) => firebase.firestore().collection('home').doc(user.userId).set(user);

const getHome = (uid) => firebase.firestore().collection('home').where('userId', '==', uid).get()
  .then((snapshot) => snapshot);

const infoUser = (idUser) => firebase.firestore().collection('home').doc(idUser).get();

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, resetPassword,
  signOut, createPost, getPost, updatePost, deletePostFeed, currentUser, createHome, getHome,
  uploadPicture, downloadPicture, likePost, getLikes, unlikePost, infoUser,
};
