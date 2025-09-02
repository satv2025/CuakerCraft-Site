// script.js
document.getElementById("copyBtn").addEventListener("click", () => {
    const ip = "mc.cuakercraft.com.ar";
    navigator.clipboard.writeText(ip).then(() => {
    });
});