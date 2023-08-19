  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut}
from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCwUL5pQ1rTqwKfscIzjoGU_IjwU18W1u4",
    authDomain: "smit-3110f.firebaseapp.com",
    projectId: "smit-3110f",
    storageBucket: "smit-3110f.appspot.com",
    messagingSenderId: "832296365657",
    appId: "1:832296365657:web:e8048c2751a39bf88bcb48",
    measurementId: "G-0DH1FQXCR6"
  };
import { redirectTo,getCurrentUrl } from "./index.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const signUpForm = document.getElementById('signup')
const loginForm = document.getElementById('login')
const signUpForm = document.getElementById('sigup')
const createAccountContainer = document.getElementById('createAccountContainer')

if(signUpForm){
    signUpForm.addEventListener('submit', signup)
}
if(loginForm){
    loginForm.addEventListener('submit', login)
}

function checkIfUserIsLoggedIn(user){
    let isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    console.log(isUserLoggedIn)
    console.log(getCurrentUrl())
    if(isUserLoggedIn.toLowerCase() == "true" && user){
        console.log("user is already logged in");
        if(!getCurrentUrl().includes('/home.html')){
            redirectTo('/home.html')
        }
    }
    else{
        console.log("user is not logged in");
        if(!getCurrentUrl().includes('/login.html')){
            redirectTo('/login.html')
        }
    }
}


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        checkIfUserIsLoggedIn(user);
        console.log(user)
        console.log('User uid-->', uid)
        
    } else {
        console.log('User is not logged in')
        checkIfUserIsLoggedIn(user);
    }
});

function signup(e) {
    e.preventDefault()
    const name = document.getElementById('signup_name').value
    const email = document.getElementById('signup_email').value
    const password = document.getElementById('signup_password').value

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userInfo = {
            name,
            email,
            uid: user.uid
        }
        const userRef = doc(db, 'bilal_users', user.uid)
        localStorage.setItem('isUserLoggedIn',true)
        await setDoc(userRef, userInfo)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
    });
}

function login(e) { 
    e.preventDefault()
    const email = document.getElementById('login_email').value
    const password = document.getElementById('login_password').value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem('isUserLoggedIn',true)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message)
    });
 }
