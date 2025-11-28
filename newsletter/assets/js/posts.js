// posts.js
import { pb } from "./supabase.js";

// Crear una nueva noticia
export async function createPost({ title, subtitle, content, author }) {
    return await pb.collection("posts").create({
        title,
        subtitle,
        content,
        author,
        publishedAt: new Date()
    });
}

// Obtener todas las noticias
export async function getAllPosts() {
    return await pb.collection("posts").getFullList({
        sort: "-publishedAt"
    });
}

// Obtener una noticia por ID
export async function getPostById(id) {
    return await pb.collection("posts").getOne(id);
}

// Editar una noticia
export async function updatePost(id, data) {
    return await pb.collection("posts").update(id, data);
}

// Eliminar una noticia
export async function deletePost(id) {
    return await pb.collection("posts").delete(id);
}