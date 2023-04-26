import './style.css'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebase';


const app = initializeApp(firebaseConfig);

document.getElementById('quickLinks')?.addEventListener('click', () => {
    document.getElementById('quickDropdown')?.classList.toggle('show');
});


console.log(app);