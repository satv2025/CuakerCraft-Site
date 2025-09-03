document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("newsletter-banner");
    const closeBtn = document.getElementById("newsletter-close");
    const navBtn = document.getElementById("newsletter-btn");

    closeBtn.addEventListener("click", () => {
        banner.style.display = "none";
        navBtn.classList.remove("hidden");
    });
});