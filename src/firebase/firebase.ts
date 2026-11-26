
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCS21J6fdRK1s7EkaJ_tWcKnWPl0nmTiCg",
    authDomain: "dashboardclima-g13.firebaseapp.com",
    databaseURL: "https://dashboardclima-g13-default-rtdb.firebaseio.com/",
    projectId: "dashboardclima-g13",
    storageBucket: "dashboardclima-g13.firebasestorage.app",
    messagingSenderId: "454204187168",
    appId: "1:454204187168:web:2eec1203ac850b097d1245"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
