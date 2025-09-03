import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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

const form = document.getElementById("register-form");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            alert("Por favor verifica el captcha");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

            await setDoc(doc(db, "users", user.uid), {
                fullName,
                username,
                email,
                createdAt: new Date()
            });

            alert(`¡Registro exitoso! Bienvenido ${fullName}`);
            window.location.href = "/"; // redirección limpia
        } catch (err) {
            alert("Error: " + err.message);
        }
    });
}