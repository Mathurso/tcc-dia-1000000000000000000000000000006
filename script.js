document.addEventListener('DOMContentLoaded', function() {
    // Função para rolagem suave
    function scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Navegação por links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Filtro de gênero
    const genreTabs = document.querySelectorAll('.genre-tab');
    if (genreTabs.length > 0) {
        genreTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove classe active de todas as tabs
                genreTabs.forEach(t => {
                    t.classList.remove('active');
                });
                
                // Adiciona classe active na tab clicada
                this.classList.add('active');
                
                // Filtra os livros
                document.querySelectorAll('.catalog-book').forEach(book => {
                    if (filter === 'all') {
                        book.style.display = 'flex';
                    } else {
                        book.style.display = book.getAttribute('data-genre') === filter ? 'flex' : 'none';
                    }
                });
            });
        });

        // Ativa a tab inicial
        const activeTab = document.querySelector('.genre-tab.active');
        if (activeTab) {
            activeTab.click();
        }
    }

    // Configuração da busca móvel
    function setupMobileSearch() {
        const searchContainer = document.querySelector('.search-container');
        const searchProfile = document.querySelector('.search-profile');
        
        if (!searchContainer || !searchProfile) return;
        
        // Remove ícone existente se houver
        const existingIcon = document.querySelector('.mobile-search-icon');
        if (existingIcon) {
            existingIcon.remove();
        }
        
        if (window.innerWidth <= 480) {
            const searchIcon = document.createElement('div');
            searchIcon.className = 'icon mobile-search-icon';
            searchIcon.innerHTML = '<i class="fas fa-search"></i>';
            
            searchIcon.addEventListener('click', function() {
                searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
                if (searchContainer.style.display === 'block') {
                    document.querySelector('.search-bar')?.focus();
                }
            });
            
            searchProfile.prepend(searchIcon);
            searchContainer.style.display = 'none';
        } else {
            searchContainer.style.display = 'block';
        }
    }

    // Ajuste do header para mobile
    function adjustHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            const logo = document.querySelector('.logo');
            const searchProfile = document.querySelector('.search-profile');
            
            if (nav && logo && searchProfile) {
                header.style.minHeight = (logo.offsetHeight + nav.offsetHeight + searchProfile.offsetHeight + 20) + 'px';
            }
        } else {
            header.style.minHeight = '';
        }
    }

    // Inicialização
    function init() {
        setupMobileSearch();
        adjustHeader();
        
        // Configura botões de scroll
        document.querySelectorAll('button[onclick^="scrollToSection"]').forEach(button => {
            button.addEventListener('click', function() {
                const match = this.getAttribute('onclick').match(/'([^']+)'/);
                if (match && match[1]) {
                    scrollToSection(match[1]);
                }
            });
        });
    }

    // Evento de resize com debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupMobileSearch();
            adjustHeader();
        }, 250);
    });

    // Inicia o script
    init();
});