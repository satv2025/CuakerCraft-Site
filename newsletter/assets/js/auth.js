import { supabase } from "./supabase.js";

/* ============================================================
   REGISTRO
============================================================ */
export async function register(fullName, username, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                username: username
            }
        }
    });

    if (error) throw error;
    return data;
}

/* ============================================================
   LOGIN
============================================================ */
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
}

/* ============================================================
   LOGOUT
============================================================ */
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/* ============================================================
   OBTENER USUARIO ACTUAL
============================================================ */
export async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user || null;
}

/* ============================================================
   OBTENER ROL DESDE public.users
============================================================ */
export async function getRole() {
    const user = await getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

    if (error || !data) return null;

    return data.role;
}

/* ============================================================
   HANDLERS UNIVERSALES PARA FORMULARIOS
============================================================ */

/* ---------- REGISTRO AUTOMÁTICO ---------- */
export function registerFormHandler(formId, redirect = "/login.html") {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            await register(fullName, username, email, password);
            alert("Registro exitoso. Revisá tu correo para verificar la cuenta.");
            window.location.href = redirect;
        } catch (err) {
            alert("Error: " + err.message);
        }
    });
}

/* ---------- LOGIN AUTOMÁTICO ---------- */
export function loginFormHandler(formId, redirect = "/index.html") {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            await login(email, password);
            window.location.href = redirect;
        } catch (err) {
            alert("Error: " + err.message);
        }
    });
}