import { initializeApp, getApps, getApp } from "firebase/app";

// Public web config — safe to expose in the browser (these are NEXT_PUBLIC_ vars).
// Currently unused because all writes go through server-side API routes with
// the Admin SDK (see lib/firebase-admin.ts), which is the secure pattern for
// this project. Kept here in case you later add client-side reads.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
