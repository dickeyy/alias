// when this is called, the user is already logged in but is annonymous, we want to have the user log in with google and then link the accounts

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase_app from "../config";

export default function convertToGoogle() {
    const auth = getAuth(firebase_app);
    const gProvider = new GoogleAuthProvider()

    signInWithPopup(auth, gProvider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
    })
}