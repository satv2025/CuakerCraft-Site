import { supabase } from "./supabase.js";
import { getRole, logout } from "./auth.js";

const noPermissionSection = document.getElementById("no-permission");
const panelSection = document.getElementById("panel-section");
const postForm = document.getElementById("post-form");
const panelPostsDiv = document.getElementById("panel-posts");
const logoutLink = document.getElementById("logout-link");

async function initPanel() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        noPermissionSection.style.display = "block";
        noPermissionSection.innerHTML = `
      <h2>⛔ Debés iniciar sesión para acceder al panel.</h2>
      <p><a href="/login.html" style="color:#00ff88;">Ir a Iniciar Sesión</a></p>
    `;
        return;
    }

    const role = await getRole();

    if (role !== "publisher" && role !== "admin") {
        noPermissionSection.style.display = "block";
        return;
    }

    panelSection.style.display = "block";
    await loadPanelPosts();
}

async function loadPanelPosts() {
    const { data, error } = await supabase
        .from("panel_posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        panelPostsDiv.innerHTML = "<p>Error al cargar publicaciones.</p>";
        console.error(error);
        return;
    }

    if (!data || data.length === 0) {
        panelPostsDiv.innerHTML = "<p>No hay publicaciones todavía.</p>";
        return;
    }

    panelPostsDiv.innerHTML = "";

    data.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${new Date(post.created_at).toLocaleString()}</small>
    `;
        panelPostsDiv.appendChild(div);
    });
}

if (postForm) {
    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const titleInput = document.getElementById("title");
        const contentInput = document.getElementById("content");

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert("Completá título y contenido.");
            return;
        }

        const { error } = await supabase
            .from("panel_posts")
            .insert({ title, content });

        if (error) {
            alert("Error al publicar: " + error.message);
            console.error(error);
            return;
        }

        alert("Publicación creada con éxito.");
        titleInput.value = "";
        contentInput.value = "";
        await loadPanelPosts();
    });
}

if (logoutLink) {
    logoutLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await logout();
        window.location.href = "/index.html";
    });
}

initPanel();