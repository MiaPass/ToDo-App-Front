import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleBtn() {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function handleGoogle(e) {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...

        // console.log(user);
        const form = {
          email: user.email,
          profilephoto: user.photoURL,
          displayname: user.displayName,
          id: user.uid,
        };

        axios
          .post("http://localhost:3001/api/user/google", form)
          // .then((res) => console.log(res))
          .catch((err) => console.log(err));

        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorCode);
        console.log(errorMessage);
        console.log(credential);
      });
  }

  return (
    <button onClick={(e) => handleGoogle(e)} className="googleLog">
      <p>Sign in with Google</p>
    </button>
  );
}
