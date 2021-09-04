import { getError } from '../Errors/index.js';

const storage = firebase.storage();

const loginEmailAndPassword = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);

const loginWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signUpWithEmailAndPassword = (email, password) => firebase
  .auth().createUserWithEmailAndPassword(email, password);

const keepMeLogged = (persistence) => {
  firebase.auth().setPersistence(persistence).then(() => {
    const provider = new firebase.auth();
    return firebase.auth().signInWithRedirect(provider);
  }).catch((error) => {
    console.log(error)//getError(error);
  });
};


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

const createComment = (idPost, comment) => firebase.firestore().collection('post').doc(idPost).update({ comments: firebase.firestore.FieldValue.arrayUnion(comment) });

const getComments = (idPost) => firebase.firestore().collection('post').doc(idPost).get();

//const deletePostComment = (idPost, comment) => firebase.firestore().collection('post').doc(idPost).update({ comments: firebase.firestore.FieldValue.arrayRemove(comment) });

const createHome = (user) => firebase.firestore().collection('home').doc(user.userId).set(user);

const getHome = (uid) => firebase.firestore().collection('home').where('userId', '==', uid).get()
  .then((snapshot) => snapshot);

const infoUser = (idUser) => firebase.firestore().collection('home').doc(idUser).get();

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, keepMeLogged, resetPassword,
  signOut, createPost, getPost, updatePost, deletePostFeed, currentUser, createHome, getHome,
  uploadPicture, downloadPicture, likePost, getLikes, unlikePost, createComment, getComments, 
 /* deletePostComment,*/ infoUser,
};
