import '../styles/login.css';
import { app } from "../handlers/firebaseHandler";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

// check auth state
auth.onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
        window.location.href = "/";
    } else if (user && !user.emailVerified) {
        auth.signOut();
        alert("Please verify your email before logging in.");
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
        .then(() => {})
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

const urlParams = new URLSearchParams(window.location.search);
const registered = urlParams.get('registered');
if (registered) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("messageBox");
    const messageBoxText = document.createElement("p");
    messageBoxText.innerText = "You have successfully registered! Please check your email to verify your account.";
    messageBox.appendChild(messageBoxText);
    document.body.appendChild(messageBox);
}
