import { collection, setDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "./databaseHandler";

export const sendNotification = async (uid: string, notification: { title: string; body: string, link: string }) => {
    // Notificaiton with random ID is added to the notifications subcollection in userProfiles/uid document
    const notificationData = {
        title: notification.title,
        body: notification.body,
        timestamp: serverTimestamp(),
        read: false,
        shown: false,
        link: notification.link
    };
    const notificationsRef = collection(doc(db, "userProfiles", uid), "notifications");
    await setDoc(doc(notificationsRef), notificationData, { merge: true });
}

