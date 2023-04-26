import '../styles/login.css';
import { app } from "../handlers/firebaseHandler";
import { db } from '../handlers/databaseHandler';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth(app);


auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "/";
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
        .then(async (userCredential) => {
            const user = userCredential.user;
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
            await addDoc(collection(db, "userProfiles"), data).then(() => {
                auth.signOut().then(() => {
                    window.location.href = "/login/?registered=true";
                });
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
