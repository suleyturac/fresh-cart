import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmjHyuLHqxm5_awOWN9vcyRc6A5C6qTso",
  authDomain: "curbsidedistribution-888e0.firebaseapp.com",
  projectId: "curbsidedistribution-888e0",
  storageBucket: "curbsidedistribution-888e0.firebasestorage.app",
  messagingSenderId: "731478512608",
  appId: "1:731478512608:web:4e134235c38d28f14f5185",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
