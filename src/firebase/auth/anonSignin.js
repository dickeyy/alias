import firebase_app from "../config";
import { signInAnonymously, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function anonSignin() {
    try {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return null;
    }
}