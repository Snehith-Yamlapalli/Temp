// lib/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || null;
  const svc = raw ? JSON.parse(raw) : undefined;
  admin.initializeApp({
    credential: svc ? admin.credential.cert(svc) : admin.credential.applicationDefault(),
  });
}

/**
 * Verify Authorization header Bearer token.
 * Works for both node req.headers.authorization and Request in app router (req.headers.get).
 */
export async function verifyIdTokenFromReq(req) {
  // req might be Node IncomingMessage or Web Fetch Request
  let authHeader = null;
  try {
    // for app router Request
    if (typeof req.headers?.get === "function") {
      authHeader = req.headers.get("authorization");
    } else {
      // for pages/api or node
      authHeader = req.headers?.authorization || null;
    }
  } catch (e) {
    authHeader = null;
  }

  if (!authHeader) return null;
  const match = authHeader.match ? authHeader.match(/^Bearer (.*)$/) : authHeader.split(" ");
  let token = null;
  if (Array.isArray(match)) token = match[1];
  else if (match && match[1]) token = match[1];

  if (!token) return null;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch (err) {
    console.error("verifyIdToken error:", err?.message || err);
    return null;
  }
}
