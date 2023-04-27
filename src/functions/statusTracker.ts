/**
 * Status tracker tracks and updates last seen and online status of current user
 */

import { app } from "../handlers/firebaseHandler";
import { getDatabase, ref, set, onValue, serverTimestamp, onDisconnect } from "firebase/database";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export const statusTracker = () => {
    auth.onAuthStateChanged((user) => {
        trackStatus(user?.uid as string);
    });
};

const trackStatus = (user: string) => {
    if (user) {
        const db = getDatabase(app);
        const userStatusRef = ref(db, "userStatus/" + user);
        const connectedRef = ref(db, ".info/connected");
        var isOfflineForDatabase = {
            state: "offline",
            last_changed: serverTimestamp(),
        };
        var isOnlineForDatabase = {
            state: "online",
            last_changed: serverTimestamp(),
        };
        onValue(connectedRef, (snapshot) => {
            if (snapshot.val() == false) {
                set(userStatusRef, isOfflineForDatabase);
                return;
            };
            onDisconnect(userStatusRef).set(isOfflineForDatabase).then(() => {
                set(userStatusRef, isOnlineForDatabase);
            });
    });
    }
};

export const userStatus = (uid: string) => {
    // return status and last seen of user
    const db = getDatabase(app);
    const userStatusRef = ref(db, "userStatus/" + uid);
    onValue(userStatusRef, (snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
    });
};
