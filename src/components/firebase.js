import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "ptorts-43f07.firebaseapp.com",
  projectId: "ptorts-43f07",
  storageBucket: "ptorts-43f07.appspot.com",
  messagingSenderId: "219215251436",
  appId: "1:219215251436:web:ade0c2b7dea2ac5f0ae2c9",
  measurementId: "G-F4978EQSN6"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
