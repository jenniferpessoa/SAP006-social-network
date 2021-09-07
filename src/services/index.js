import { getError } from '../Errors/index.js';
import { navigation } from '../routes/navigation.js';

const storage = firebase.storage();

const loginEmailAndPassword = (email, password) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => navigation('/feed'));
  }).catch((error) => {
    getError(error);
  });
};

const loginWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    firebase.auth().signInWithPopup(provider).then(() => navigation('/feed'));
  }).catch((error) => {
    getError(error);
  });
};

const signUpWithEmailAndPassword = (email, password) => firebase
  .auth().createUserWithEmailAndPassword(email, password);

const signOut = () => firebase.auth().signOut();

const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

const currentUser = () => {
  const userSession = sessionStorage.getItem(Object.keys(sessionStorage)[0]);
  const user = JSON.parse(userSession);
  return user;
};

const createPost = (post) => firebase.firestore().collection('post').add(post);

const getPost = () => firebase.firestore().collection('post').orderBy('date', 'desc').get();

const updatePost = (idPost, post) => firebase.firestore().collection('post').doc(idPost).update({ text: post });

const deletePostFeed = (idPost) => firebase.firestore().collection('post').doc(idPost).delete();

const getLikes = (idPost) => firebase.firestore().collection('post').doc(idPost).get();

const likePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayUnion(idUser) });

const uploadPicture = (log, folder) => storage.ref(`images/${log}`).put(folder);

const downloadPicture = (log) => storage.ref().child(`images/${log}`).getDownloadURL();

const unlikePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayRemove(idUser) });

const createComment = (idPost, comment) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .add(comment);

const getComments = (idPost) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .orderBy('date', 'asc')
  .get();

const getPublishComment = (idPost, idComment) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(idComment)
  .get();

const deleteCommentFeed = (idPost, idComment) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(idComment)
  .delete();

const createHome = (user) => firebase.firestore().collection('home').doc(user.userId).set(user);

const getHome = (uid) => firebase.firestore().collection('home').where('userId', '==', uid).get()
  .then((snapshot) => snapshot);

const infoUser = (idUser) => firebase.firestore().collection('home').doc(idUser).get();

const searchPosts = (array) => firebase.firestore().collection('post').where('keywords', 'array-contains-any', array)
  .orderBy('date', 'asc')
  .get();

const savePost = (idUser, idPostSave, obj) => firebase.firestore().collection('home').doc(idUser).collection('postsave')
  .doc(idPostSave)
  .set(obj);

const getPostSave = (idUser) => firebase.firestore().collection('home').doc(idUser).collection('postsave')
  .get();

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, resetPassword,
  signOut, createPost, getPost, updatePost, deletePostFeed, currentUser, createHome, getHome,
  uploadPicture, downloadPicture, likePost, getLikes, unlikePost, createComment, getComments,
  getPublishComment, deleteCommentFeed, infoUser, searchPosts, savePost, getPostSave,
};
