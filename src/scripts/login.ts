import '../styles/login.css';
import { app } from "../handlers/firebaseHandler";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

// check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "/";
    }
});

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput as HTMLInputElement;
    const password = passwordInput as HTMLInputElement;
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            // Signed in
            window.location.href = "/";
            // ...
        }
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
        );
});

