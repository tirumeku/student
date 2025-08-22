
'use server';

import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// NOTE: This is a simplified example. In a real app, you'd want to handle
// errors more gracefully and securely.

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { isSuccess: true, user: userCredential.user, errors: null };
  } catch (error) {
    return { isSuccess: false, user: null, errors: [error.message] };
  }
}

export async function login({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    return {
      isSuccess: true,
      accessToken: idToken,
      refreshToken: userCredential.user.refreshToken,
      errors: null,
    };
  } catch (error) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message],
    };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { isSuccess: true, errors: null };
  } catch (error) {
    return { isSuccess: false, errors: [error.message] };
  }
}

export function observeAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
