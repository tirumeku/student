
'use client';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function observeAuthChanges(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}
