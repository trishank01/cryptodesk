import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSPAfrqO8C7i1kM5beOSHCAOhGNaMkuJs",
  authDomain: "cryptodesk-45364.firebaseapp.com",
  projectId: "cryptodesk-45364",
  storageBucket: "cryptodesk-45364.appspot.com",
  messagingSenderId: "93143128615",
  appId: "1:93143128615:web:8b56a4f3a2029a99914c02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db  = getFirestore(app)
export const storage  = getStorage(app)
export default app