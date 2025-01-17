import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.googleProvider=new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }
  //AUTH API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle=()=>
  this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook=()=>this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
  // database
  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  // Merge Auth And Database
  onAuthUserListener=(next,fallback)=>{
    this.auth.onAuthStateChanged(authUser=>{
      if(authUser)
      {
      this.user(authUser.uid)
      .once('value')
      .then(snapshot=>{
        var dbUser=snapshot.val();

        if(!dbUser.roles){
          dbUser.roles={'ADMIN':null};
        }
        authUser={
          uid:authUser.uid,
          email:authUser.email,
          ...dbUser
        }
        next(authUser)
      })}
      else
      {
        fallback();
      }
    })
  }
}

export default Firebase;
