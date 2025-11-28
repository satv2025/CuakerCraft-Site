import { supabase } from "./supabase.js";

async function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("article").innerHTML = "<h2>ID no proporcionado.</h2>";
        return;
    }

    const { data, error } = await supabase
        .from("panel_posts")
        .select("*")
        .eq("short_id", id)
        .maybeSingle();

    if (error || !data) {
        document.getElementById("article").innerHTML =
            "<h2>Artículo no encontrado.</h2>";
        return;
    }

    document.title = data.title + " - CuakerCraft";

    document.getElementById("article").innerHTML = `
        <h1>${data.title}</h1>
        <p>${data.content}</p>
        <small>Publicado: ${new Date(data.created_at).toLocaleString()}</small>
    `;
}

loadArticle();