import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './loginform'
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCR_F4Jo8O_Qkz5UZFkmik5VdN9-iYBO-k",
  authDomain: "externships-1b835.firebaseapp.com",
  databaseURL: "https://externships-1b835.firebaseio.com",
  projectId: "externships-1b835",
  storageBucket: "",
  messagingSenderId: "1014504494790",
  appId: "1:1014504494790:web:d04fc7d8957208d5"
}
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<LoginForm/>, document.getElementById("auth"))