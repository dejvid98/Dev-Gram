import React from "react";
import Navbar from "../Layout/Navbar";
import TextField from "@material-ui/core/TextField";
import Checkbox from "../micro-components/Checkbox";
import Button from "@material-ui/core/Button";
import firebase from '../../firebase'


const Register = props => {

  var provider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  return (
    <div>
      <div className="register-div">
        <Navbar />
        <div className="register-form">
          <div className="name-fields">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              style={{ marginRight: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ marginTop: "25px" }}
          />
          <div className="name-fields" style={{ marginTop: "25px" }}>
            <TextField
              id="outlined-password-input"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              style={{ marginRight: "10px" }}
            />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <Checkbox />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#0074D9",marginTop:"25px" }}
          >
            Sign Up with email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
