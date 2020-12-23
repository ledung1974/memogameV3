import { auth } from "../firebasedb/configFirebase"

export function createPlayer(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
    return auth.signOut();
}

export function sendPasswordResetEmail(email) {
    return auth.sendPasswordResetEmail(email);
}

