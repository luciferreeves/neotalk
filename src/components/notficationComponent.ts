/**
 * notfications Component
 * 
 * generates a HTML component which will be used to display notifications
 */

import { getAuth } from "firebase/auth";
import { app } from "../handlers/firebaseHandler";
import { collection, query, where, onSnapshot, setDoc, orderBy, limit } from "firebase/firestore";
import { db } from "../handlers/databaseHandler";
import { mutationObserver } from "../handlers/mutationObserver";
import { notify } from "../functions/toasts";

const auth = getAuth(app);

export const notificationsComponent = () => {
    mutationObserver('notificationsButton', () => {
        const notifications = document.getElementById('notificationsButton');
        const handleLoginContainer = document.getElementById("handleLoginContainer");
        if (notifications && handleLoginContainer) {
            const user = auth.currentUser?.uid;
            if (user) {
                const notificationsRef = collection(db, "userProfiles", user, "notifications");
                const notificationsQuery = query(notificationsRef, where("read", "==", false));
                notifications.classList.add('has-notifications');
                onSnapshot(notificationsQuery, (snapshot) => {
                    if (snapshot.size > 0) {
                        notifications.classList.add('has-notifications');
                        // Notifications which are not read and also not shown are shown
                        snapshot.forEach((doc) => {
                            const notification = doc.data();
                            if (!notification.shown) {
                                notify({ title: notification.title, body: notification.body });
                                setDoc(doc.ref, { shown: true }, { merge: true });
                            }
                        });

                    } else {
                        notifications.classList.remove('has-notifications');
                    }
                });
            }
        }
    });
}

export const notificationDropdownComponent = () => {
    mutationObserver('notificationsButton', () => {
        const handleLoginContainer = document.getElementById("handleLoginContainer");
        const dropdownContainer = document.createElement("div");
        dropdownContainer.id = "notificationDropdown";
        dropdownContainer.classList.add("dropdown");
        dropdownContainer.style.display = "none";
        const dropdownContents = document.createElement("div");
        dropdownContents.style.maxHeight = "300px";
        dropdownContents.style.overflowY = "auto";
        dropdownContainer.appendChild(dropdownContents);
        if (handleLoginContainer) {
            const user = auth.currentUser?.uid;
            if (user) {
                const allNotificationsQuery = query(collection(db, "userProfiles", user, "notifications"), orderBy("timestamp", "desc"), limit(50));
                onSnapshot(allNotificationsQuery, (snapshot) => {
                    const snapshotData = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        data.ref = doc.ref;
                        return data;
                    });
                    document.getElementById("notificationDropdown") && document.getElementById("notificationDropdown")?.innerHTML === "" ? null : dropdownContents.innerHTML = "";
                    const notificationContainers = document.getElementsByClassName("notificationContainer");
                    while (notificationContainers[0]) {
                        notificationContainers[0].parentNode?.removeChild(notificationContainers[0]);
                    }
                    if (snapshotData.length > 0) {
                        snapshotData.forEach((notification) => {
                            const notificationContainer = document.createElement("div");
                            notificationContainer.classList.add("notificationContainer");
                            const readIndicator = document.createElement("div");
                            notification.read ? readIndicator.classList.add("readIndicator", "read") : readIndicator.classList.add("readIndicator", "unread");
                            notificationContainer.appendChild(readIndicator);
                            const textContainer = document.createElement("div");
                            const notificationTitle = document.createElement("h3");
                            notificationTitle.classList.add("notificationTitle");
                            notificationTitle.appendChild(document.createTextNode(notification.title));
                            const notificationBody = document.createElement("p");
                            notificationBody.classList.add("notificationBody");
                            notificationBody.appendChild(document.createTextNode(notification.body));
                            textContainer.appendChild(notificationTitle);
                            textContainer.appendChild(notificationBody);
                            notificationContainer.appendChild(textContainer);

                            readIndicator.addEventListener("click", () => {
                                event?.stopPropagation();
                                notification.read ? setDoc(notification.ref, { read: false }, { merge: true }) : setDoc(notification.ref, { read: true }, { merge: true });
                            });

                            textContainer.addEventListener("click", () => {
                                event?.stopPropagation();
                                setDoc(notification.ref, { read: true }, { merge: true });
                                window.location.href = '/' + notification.link;
                            });
                            dropdownContents.appendChild(notificationContainer);
                        });
                    } else {
                        const notificationContainer = document.createElement("div");
                        notificationContainer.innerHTML = "No notifications";
                        notificationContainer.style.textAlign = "center";
                        notificationContainer.style.padding = "1rem";
                        dropdownContents.appendChild(notificationContainer);
                    }
                });
            }
            handleLoginContainer.appendChild(dropdownContainer);
        }
    });
}
