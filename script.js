document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const animeGrid = document.getElementById("animeGrid");

    // فتح وإغلاق القائمة
    menuToggle.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    // Toggle dropdown
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");

    dropdownBtn.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
    });

    // إنشاء بطاقات الأنمي تجريبية
    const animeList = Array.from({ length: 20 }, (_, i) => ({
        title: `أنمي ${i + 1}`,
        image: ""
    }));

    animeList.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="card-info">
                <p>${anime.title}</p>
            </div>
        `;

        animeGrid.appendChild(card);
    });
});
