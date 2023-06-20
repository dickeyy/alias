// make a function to edit the display name of the user in firebase

import firebase_app from "../config";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function editDisplayname(displayName) {
    try {
        await updateProfile(auth.currentUser, {
            displayName: displayName,
        });
        return true;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return false;
    }
}