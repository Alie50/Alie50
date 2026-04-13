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

    // Toggle dropdowns
    const dropdownBtns = document.querySelectorAll(".dropbtn");

    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const content = this.nextElementSibling;
            content.classList.toggle("show");

            // Rotate icon
            const icon = this.querySelector("i");
            if (content.classList.contains("show")) {
                icon.style.transform = "rotate(180deg)";
            } else {
                icon.style.transform = "rotate(0deg)";
            }
        });
    });

    // إنشاء بطاقات الأنمي تجريبية
    const animeList = Array.from({ length: 20 }, (_, i) => ({
        title: i === 1 ? "Anime Tetsuwan Birdy Decode" : "بلا عنوان",
        image: i === 1 ? "https://via.placeholder.com/200x300/eee/999?text=Anime+Poster" : "https://via.placeholder.com/200x300/fff/ccc?text=No+Image",
        episode: i === 1 ? "الحلقة 1" : ""
    }));

    animeList.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="card-info">
                <p>${anime.title}</p>
                ${anime.episode ? `<span>${anime.episode}</span>` : ""}
            </div>
        `;

        animeGrid.appendChild(card);
    });
});
