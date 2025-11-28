import { supabase } from "./supabase.js";
import { logout } from "./auth.js";

const hero = document.querySelector(".hero");
const postsSection = document.getElementById("posts-container");
const postsDiv = document.getElementById("posts");

async function loadUserAndPosts() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Usuario logueado
        hero.innerHTML = `
            <h1>Bienvenido, ${user.user_metadata?.full_name || user.email}</h1>
            <p>Estas son las últimas novedades del Newsletter de CuakerCraft.</p>
            <button class="btn" id="btn-logout">Cerrar sesión</button>
        `;

        const btnLogout = document.getElementById("btn-logout");
        btnLogout.addEventListener("click", async () => {
            await logout();
            window.location.reload();
        });

        postsSection.style.display = "block";
        await loadPosts();
    } else {
        // Usuario NO logueado
        postsSection.style.display = "none";
    }
}

async function loadPosts() {
    const { data, error } = await supabase
        .from("panel_posts")
        .select("title, content, created_at, short_id")
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
        const preview = post.content.length > 200
            ? post.content.substring(0, 200) + "..."
            : post.content;

        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${preview}</p>
            <a href="/newsletter/articulo?id=${post.short_id}" class="btn" style="margin-top:10px;">
                Ver más
            </a>
            <br>
            <small>Publicado el ${new Date(post.created_at).toLocaleString()}</small>
        `;

        postsDiv.appendChild(div);
    });
}

loadUserAndPosts();