import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// This file runs ONLY on the server (inside API routes).
// It uses the Firebase ADMIN SDK, which authenticates with a service
// account rather than the public web config used in the browser.
//
// Initialization is lazy (only happens when getDb() is first called at
// request time) so that `next build` doesn't fail if real credentials
// aren't present in the build environment.

let cachedDb: Firestore | null = null;

export function getDb(): Firestore {
  if (cachedDb) return cachedDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel env vars store literal "\n" for newlines in the private key,
  // so they must be converted back to real newlines here.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables."
    );
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

  cachedDb = getFirestore(app);
  return cachedDb;
}
