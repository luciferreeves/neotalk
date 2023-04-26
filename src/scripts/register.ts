import '../styles/login.css';
import { app } from "../handlers/firebaseHandler";
import { db } from '../handlers/databaseHandler';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth(app);


auth.onAuthStateChanged(async (user) => {
    if (user && user.emailVerified) {
        window.location.href = "/";
    } else if (user && !user.emailVerified) {
        sendEmailVerification(user);
        const data = {
            uid: user.uid,
            status: "",
            level: 1,
            xp: 0,
            role: "user",
            bio: "",
            isPrivate: false
        }
        const docRef = await addDoc(collection(db, "userProfiles"), data);
        if (docRef.id) {
            auth.signOut();
            window.location.href = "/login/?registered=true";
        }
    }
});

const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput as HTMLInputElement;
    const password = passwordInput as HTMLInputElement;
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {})
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
