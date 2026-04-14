document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const animeGrid = document.getElementById("animeGrid");

    // فتح وإغلاق القائمة
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active");
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    }

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

    // بيانات افتراضية إذا كان التخزين المحلي فارغاً
    const defaultData = [
        {
            id: 1,
            title: "ون بيس",
            category: "انمي",
            genre: "أكشن",
            imageUrl: "https://via.placeholder.com/200x300/6a11cb/fff?text=One+Piece",
            rating: "9.1",
            duration: "1000+ حلقة",
            story: "مغامرات مونكي دي لوفي وسعيه ليصبح ملك القراصنة."
        },
        {
            id: 2,
            title: "سبايدرمان",
            category: "أفلام",
            genre: "خيال علمي",
            imageUrl: "https://via.placeholder.com/200x300/2575fc/fff?text=Spider-Man",
            rating: "8.5",
            duration: "120 دقيقة",
            story: "بيتر باركر يكتشف قواه الخارقة ويحارب الجريمة في نيويورك."
        }
    ];

    function createCard(item) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.cursor = "pointer";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="card-info">
                <p>${item.title}</p>
                <span>${item.category} / ${item.genre}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `details.html?id=${item.id}`;
        });

        return card;
    }

    function renderSpecificList(list) {
        if (!animeGrid) return;
        animeGrid.innerHTML = "";
        list.forEach(item => {
            animeGrid.appendChild(createCard(item));
        });
    }

    function loadContent(filterCategory = null, filterGenre = null) {
        if (!animeGrid) return;
        animeGrid.innerHTML = "";
        const movies = JSON.parse(localStorage.getItem('movies')) || defaultData;

        // إذا كانت القائمة فارغة تماماً (أول مرة تشغيل)
        if (localStorage.getItem('movies') === null) {
            localStorage.setItem('movies', JSON.stringify(defaultData));
        }

        const filteredMovies = movies.filter(item => {
            const matchesCategory = filterCategory ? item.category === filterCategory : true;
            const matchesGenre = filterGenre ? item.genre === filterGenre : true;
            return matchesCategory && matchesGenre;
        });

        filteredMovies.forEach(item => {
            animeGrid.appendChild(createCard(item));
        });

        if (filteredMovies.length === 0) {
            animeGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">لا يوجد محتوى متوفر حالياً.</p>';
        }
    }

    // تهيئة الروابط في القائمة الجانبية للفلترة
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const genre = e.target.textContent.trim();
            const categoryBtn = e.target.closest('.dropdown').querySelector('.dropbtn');
            const categoryRaw = categoryBtn.textContent.trim();

            // تصحيح اسم التصنيف
            let categoryName = "";
            if (categoryRaw.includes("أفلام")) categoryName = "أفلام";
            else if (categoryRaw.includes("انمي")) categoryName = "انمي";
            else if (categoryRaw.includes("كرتون")) categoryName = "كرتون";
            else if (categoryRaw.includes("مسلسلات")) categoryName = "مسلسلات";

            // إذا كنا في الصفحة الرئيسية، قم بالفلترة فوراً
            const fileName = window.location.pathname.split('/').pop();
            const isHomePage = fileName === 'index.html' || fileName === '';

            if (isHomePage) {
                e.preventDefault();
                loadContent(categoryName, genre);
                sidebar.classList.remove("active");
            } else {
                // إذا كنا في صفحة أخرى، اذهب للرئيسية مع البارامترات
                localStorage.setItem('activeFilter', JSON.stringify({ category: categoryName, genre: genre }));
                window.location.href = 'index.html';
            }
        });
    });

    // البحث في القائمة الجانبية
    const searchInput = document.querySelector('.search-sidebar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const movies = JSON.parse(localStorage.getItem('movies')) || defaultData;
            const filtered = movies.filter(m => m.title.toLowerCase().includes(term));

            const isHomePage = (window.location.pathname.includes('index.html') ||
                               window.location.pathname.endsWith('/') ||
                               window.location.pathname === '') &&
                               !window.location.search.includes('id=');

            if (isHomePage) {
                renderSpecificList(filtered);
            } else {
                // إذا كنا في صفحة أخرى، لا نفعل شيئاً حالياً أو يمكننا التوجيه للبحث
            }
        });
    }

    // التحميل الأولي ومعالجة البارامترات
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const genParam = urlParams.get('genre');

    const activeFilter = JSON.parse(localStorage.getItem('activeFilter'));

    if (animeGrid) {
        if (activeFilter) {
            loadContent(activeFilter.category, activeFilter.genre);
            localStorage.removeItem('activeFilter');
        } else {
            loadContent(catParam, genParam);
        }
    }
});
