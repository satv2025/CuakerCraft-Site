import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA7X_UAMFyvcLuQ_Cuwuhk0M3m6knluXsY",
    authDomain: "cuakercraft.firebaseapp.com",
    projectId: "cuakercraft",
    storageBucket: "cuakercraft.firebasestorage.app",
    messagingSenderId: "49863836870",
    appId: "1:49863836870:web:159b1037169a1cc74c43c7",
    measurementId: "G-8KHXRX74K6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Buscar email asociado al username en Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("Usuario no encontrado");
            return;
        }

        // Tomamos el primer usuario que coincida
        const userData = querySnapshot.docs[0].data();
        const email = userData.email;

        // Login con email + contraseña
        await signInWithEmailAndPassword(auth, email, password);

        alert(`¡Bienvenido ${userData.fullName}!`);
        window.location.href = "index"; // Redirigir al inicio
    } catch (err) {
        alert("Error: " + err.message);
    }
});