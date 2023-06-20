import firebase_app from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebase_app);

export default function checkAuthState() {
    return new Promise((resolve, reject) => {
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(null);
                }
            });
        } catch (error) {
            console.log(error);
            reject(null);
        }
    });
}