// ===== AOS INIT =====
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ===== HAMBURGER MENU =====
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Fermer le menu au clic sur un lien (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// ===== STATS COUNTER =====
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    const trigger = document.querySelector('.stats');
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        animated = true;
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = current;
            }, 25);
        });
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ===== CONSOLE WELCOME =====
console.log('%c MJTech - Solutions Digitales & Hardware ', 'background: #1a2a3a; color: #f39c12; font-size: 20px; padding: 15px; border-radius: 8px;');
console.log('%c 📞 Contactez Moudjib : +221 XX XXX XX | 📧 moudjib@mjtech.com ', 'background: #f4f7fc; color: #1a2a3a; font-size: 14px; padding: 8px;');

// ===== PORTFOLIO FILTERS (version moderne) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const noResults = document.querySelector('.no-results');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Active/Désactive les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        let visibleCount = 0;

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                visibleCount++;
                // Animation progressive
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });

        // Affiche ou cache le message "aucun résultat"
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    });
});

// ===== ANIMATION FADE POUR LES CARTES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(styleSheet);