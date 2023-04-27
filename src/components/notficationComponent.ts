/**
 * notfications Component
 * 
 * generates a HTML component which will be used to display notifications
 */

import { getAuth } from "firebase/auth";
import { app } from "../handlers/firebaseHandler";
import { collection, query, where, onSnapshot, setDoc } from "firebase/firestore";
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
