import { supabase } from "./supabase.js";

async function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const articleSection = document.getElementById("article");

    if (!id) {
        articleSection.innerHTML = "<h2>ID no proporcionado.</h2>";
        return;
    }

    // --- CSS dinámico SOLO RENOMBRANDO EN EL INSPECTOR ---
    const cssLink = document.getElementById("dynamic-article-css");
    cssLink.href = `/assets/css/article.css?v=${id}`;
    // Esto hace que el navegador vea: article.css?v=abc123
    // INSPECTOR: artículo_abc123.css

    // --- Obtener artículo ---
    const { data, error } = await supabase
        .from("panel_posts")
        .select("*")
        .eq("short_id", id)
        .maybeSingle();

    if (error || !data) {
        articleSection.innerHTML = "<h2>Artículo no encontrado.</h2>";
        return;
    }

    document.title = `${data.title} - CuakerCraft`;

    articleSection.innerHTML = `
        <h1 class="article-title">${data.title}</h1>

        <p class="article-meta">
            Publicado por <strong>${data.author_name || "Autor desconocido"}</strong> ·
            ${new Date(data.created_at).toLocaleString()}
        </p>

        <div class="article-content">
            ${data.content}
        </div>
    `;
}

loadArticle();