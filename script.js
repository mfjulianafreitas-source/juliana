document.addEventListener('DOMContentLoaded', () => {
    

    /* =========================================
       4. MENU MOBILE (HAMBÚRGUER)
    ========================================= */
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    // Abre e fecha o menu ao clicar no ícone
    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuIcon.classList.toggle('active');
        
        // Impede a rolagem do fundo quando menu está aberto
        if(navLinks.classList.contains('active')){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Fecha o menu automaticamente ao clicar em qualquer link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    /* =========================================
       1. ANIMAÇÃO DE SCROLL (Scroll Reveal)
    ========================================= */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Descomente se quiser que anime só uma vez
            }
        });
    }, revealOptions);

    reveals.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================
       2. SMOOTH SCROLL PARA LINKS INTERNOS
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Compensação para o header fixo (altura aproximada do header)
                const headerOffset = 85; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       3. GALERIA LIGHTBOX (NOVO!)
    ========================================= */
    // Pega os elementos do modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-modal")[0];

    // Pega todas as imagens dentro da seção de galeria
    const galleryImages = document.querySelectorAll('.gallery-item img');

    // Adiciona o evento de clique em cada imagem da galeria
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex"; // Mostra o modal (usando flex para centralizar)
            modal.style.alignItems = "center"; // Centraliza verticalmente
            modalImg.src = this.src; // Pega o caminho da imagem clicada e põe na grande
            captionText.innerHTML = this.alt; // Pega o texto alternativo e usa como legenda
            // Desabilita o scroll da página de fundo
            document.body.style.overflow = 'hidden';
        });
    });

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = "none";
        // Habilita o scroll da página de fundo novamente
        document.body.style.overflow = 'auto';
    }

    // Fecha ao clicar no X
    closeBtn.onclick = function() {
        closeModal();
    }

    // Fecha ao clicar fora da imagem (no fundo escuro)
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Fecha ao apertar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });

});