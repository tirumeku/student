
'use client';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function observeAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
