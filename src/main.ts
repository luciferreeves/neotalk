import './style.css'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebase';


const app = initializeApp(firebaseConfig);

console.log(app);