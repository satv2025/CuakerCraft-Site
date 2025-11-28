import { supabase } from "./supabase.js";
import { logout } from "./auth.js";

const hero = document.querySelector(".hero");
const postsSection = document.getElementById("posts-container");
const postsDiv = document.getElementById("posts");

async function loadUserAndPosts() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Usuario logueado: mensaje personalizado + botón logout
        hero.innerHTML = `
      <h1>Bienvenido, ${user.user_metadata?.full_name || user.email}</h1>
      <p>Estas son las últimas novedades de CuakerCraft directamente desde el newsletter.</p>
      <button class="btn" id="btn-logout">Cerrar sesión</button>
    `;

        const btnLogout = document.getElementById("btn-logout");
        btnLogout.addEventListener("click", async () => {
            await logout();
            window.location.reload();
        });

        // Mostrar posts
        postsSection.style.display = "block";
        await loadPosts();
    } else {
        // Usuario no logueado: hero por defecto y ocultar posts
        postsSection.style.display = "none";
    }
}

async function loadPosts() {
    const { data, error } = await supabase
        .from("panel_posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        postsDiv.innerHTML = "<p>Error al cargar las publicaciones.</p>";
        return;
    }

    if (!data || data.length === 0) {
        postsDiv.innerHTML = "<p>No hay publicaciones todavía.</p>";
        return;
    }

    postsDiv.innerHTML = "";

    data.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Publicado el ${new Date(post.created_at).toLocaleString()}</small>
    `;
        postsDiv.appendChild(div);
    });
}

loadUserAndPosts();