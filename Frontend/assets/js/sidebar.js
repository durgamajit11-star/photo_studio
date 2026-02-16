/* =========================
   GLOBAL HELPERS
========================= */
const body = document.body;
const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

/* =========================
   SIDEBAR TOGGLE
========================= */
function toggleSidebar() {
    sidebar.classList.toggle("collapsed");

    // Optional: save state
    localStorage.setItem(
        "sidebarCollapsed",
        sidebar.classList.contains("collapsed")
    );
}

/* Restore sidebar state */
(function restoreSidebar() {
    const collapsed = localStorage.getItem("sidebarCollapsed") === "true";
    if (collapsed) sidebar.classList.add("collapsed");
})();

/* =========================
   SUBMENU TOGGLE
========================= */
function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    const isOpen = submenu.style.display === "block";

    // Close all submenus first
    document.querySelectorAll(".submenu").forEach(menu => {
        menu.style.display = "none";
    });

    submenu.style.display = isOpen ? "none" : "block";
}

/* =========================
   THEME TOGGLE (DARK / LIGHT)
========================= */
function toggleTheme() {
    body.classList.toggle("light");

    const theme = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
}

/* Restore theme on load */
(function restoreTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    }
})();

/* =========================
   MOBILE MENU
========================= */
function toggleMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
}

/* Close mobile menu on resize */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu) {
        mobileMenu.style.display = "none";
    }
});

/* =========================
   LOGOUT
========================= */
function logout() {
    // Clear auth/session data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to landing/login page
    window.location.href = "index.html";
}

/* =========================
   ACTIVE LINK HIGHLIGHT
========================= */
document.querySelectorAll(".sidebar-menu a").forEach(link => {
    link.addEventListener("click", function () {
        document
            .querySelectorAll(".sidebar-menu a")
            .forEach(l => l.classList.remove("active"));

        this.classList.add("active");
    });
});
