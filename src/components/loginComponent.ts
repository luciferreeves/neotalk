/**
 * Handle login component
 *
 * This is a HTML generating component which will be used to handle the login
 * Login is handled by firebase
 */

import { getAuth } from "firebase/auth";
import { app } from "../handlers/firebaseHandler";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../handlers/databaseHandler';
import '../styles/profileNav.css';

const auth = getAuth(app);

export const loginComponent = () => {
  const handleLoginContainer = document.getElementById("handleLoginContainer");
  
  // Check if user is logged in
  auth.onAuthStateChanged(async (user) => {
    while (handleLoginContainer?.firstChild) {
      handleLoginContainer.removeChild(handleLoginContainer.firstChild);
    }
    if (user) {

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
      profile.id = "profile";
      const profileIcon = document.createElement("i");
      profileIcon.classList.add("uil", "uil-user");
      profile.appendChild(profileIcon);
      const profileText = document.createTextNode("Profile");
      profile.appendChild(profileText);

      const profileDropdown = document.createElement("div");
      profileDropdown.id = "profileDropdown";
      profileDropdown.style.display = "none";
      profileDropdown.classList.add("dropdown");

      const userPosts = document.createElement("a");
      userPosts.href = "/profile/posts/";
      const userPostsIcon = document.createElement("i");
      userPostsIcon.classList.add("uil", "uil-comment-message");
      userPosts.appendChild(userPostsIcon);
      userPosts.appendChild(document.createTextNode("My Posts"));
      profileDropdown.appendChild(userPosts);

      const userProfile = document.createElement("a");
      userProfile.href = "/profile/";
      const userProfileIcon = document.createElement("i");
      userProfileIcon.classList.add("uil", "uil-user");
      userProfile.appendChild(userProfileIcon);
      userProfile.appendChild(document.createTextNode("My Profile"));
      profileDropdown.appendChild(userProfile);

      const settings = document.createElement("a");
      settings.href = "/settings/";
      const settingsIcon = document.createElement("i");
      settingsIcon.classList.add("uil", "uil-cog");
      settings.appendChild(settingsIcon);
      settings.appendChild(document.createTextNode("My Account"));
      profileDropdown.appendChild(settings);

      const logout = document.createElement("a");
      logout.href = "#";
      const logoutIcon = document.createElement("i");
      logoutIcon.classList.add("uil", "uil-sign-out-alt");
      logout.appendChild(logoutIcon);
      logout.appendChild(document.createTextNode("Logout"));
      logout.addEventListener("click", () => {
        auth.signOut().then(() => {
          window.location.reload();
        });
      });
      profileDropdown.appendChild(logout);

      handleLoginContainer?.appendChild(notifications);
      handleLoginContainer?.appendChild(privateMessages);
      handleLoginContainer?.appendChild(profile);
      handleLoginContainer?.appendChild(profileDropdown);

      const userExp = document.createElement("a");
      const userExpIcon = document.createElement("i");
      userExpIcon.classList.add("uil", "uil-bolt");
      userExp.appendChild(userExpIcon);
      const userExpText = document.createTextNode("User XP: ");
      userExp.appendChild(userExpText);
      const docRef = doc(db, "userProfiles", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userExpNumber = document.createTextNode(docSnap.data().xp);
        userExp.appendChild(userExpNumber);
      }
      profileDropdown.prepend(userExp);
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
      registerButton.addEventListener("click", () => {
        window.location.href = "/register/";
      });

      handleLoginContainer?.appendChild(loginButton);
      handleLoginContainer?.appendChild(registerButton);
    }
  });
};

