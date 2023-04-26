/**
 * Handle login component
 *
 * This is a HTML generating component which will be used to handle the login
 * Login is handled by firebase
 */

import { getAuth } from "firebase/auth";
import { app } from "../handlers/firebaseHandler";

const auth = getAuth(app);

export const loginComponent = () => {
  const handleLoginContainer = document.getElementById("handleLoginContainer");

  // Check if user is logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, build user based nav
      const notifications = document.createElement("button");
      const notificationIcon = document.createElement("i");
      notificationIcon.classList.add("uil", "uil-bell");
      notifications.appendChild(notificationIcon);
      const notificationText = document.createTextNode("Notifications");
      notifications.appendChild(notificationText);

      const privateMessages = document.createElement("button");
      const privateMessageIcon = document.createElement("i");
      privateMessageIcon.classList.add("uil", "uil-envelope");
      privateMessages.appendChild(privateMessageIcon);
      const privateMessageText = document.createTextNode("Private Messages");
      privateMessages.appendChild(privateMessageText);

      const profile = document.createElement("button");
      const profileIcon = document.createElement("i");
      profileIcon.classList.add("uil", "uil-user");
      profile.appendChild(profileIcon);
      const profileText = document.createTextNode("Profile");
      profile.appendChild(profileText);

      handleLoginContainer?.appendChild(notifications);
      handleLoginContainer?.appendChild(privateMessages);
      handleLoginContainer?.appendChild(profile);
    } else {
      const loginButton = document.createElement("button");
      const loginIcon = document.createElement("i");
      loginIcon.classList.add("uil", "uil-bolt");
      loginButton.appendChild(loginIcon);
      const loginText = document.createTextNode("Login");
      loginButton.appendChild(loginText);
      loginButton.addEventListener("click", () => {
        window.location.href = "/login/";
      });

      const registerButton = document.createElement("button");
      const registerIcon = document.createElement("i");
      registerIcon.classList.add("uil", "uil-clipboard-notes");
      registerButton.appendChild(registerIcon);
      const registerText = document.createTextNode("Register");
      registerButton.appendChild(registerText);

      handleLoginContainer?.appendChild(loginButton);
      handleLoginContainer?.appendChild(registerButton);
    }
  });
};
