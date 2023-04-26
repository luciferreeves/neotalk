// Firelord Init

import { app } from './firebaseHandler';
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);
