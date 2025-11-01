/**
 * MAIN.JS - Arquivo Principal de Inicialização
 * Instituto Esperança - Sistema de Gerenciamento Web
 * 
 * Este arquivo é responsável por inicializar todos os módulos
 * e funcionalidades do site quando o DOM estiver carregado.
 */

// =============================================================================
// CONFIGURAÇÕES GLOBAIS
// =============================================================================

const CONFIG = {
    siteName: 'Instituto Esperança',
    version: '1.0.0',
    apiCEP: 'https://viacep.com.br/ws/',
    debug: true // Mude para false em produção
};

// =============================================================================
// FUNÇÃO DE LOG (para debug)
// =============================================================================

function log(message, type = 'info') {
    if (!CONFIG.debug) return;
    
    const styles = {
        info: 'color: #2196F3',
        success: 'color: #4CAF50',
        warning: 'color: #FF9800',
        error: 'color: #F44336'
    };
    
    console.log(`%c[${CONFIG.siteName}] ${message}`, styles[type] || styles.info);
}

// =============================================================================
// INICIALIZAÇÃO DO MENU RESPONSIVO
// =============================================================================

function initMenuResponsivo() {
    log('Inicializando menu responsivo...', 'info');
    
    const nav = document.querySelector('nav');
    if (!nav) {
        log('Navegação não encontrada', 'warning');
        return;
    }
    
    // Criar botão hamburguer se não existir
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const logo = nav.querySelector('img');
        if (logo) {
            logo.after(menuToggle);
        } else {
            nav.prepend(menuToggle);
        }
    }
    
    const navList = nav.querySelector('ul');
    
    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        const isOpen = navList.classList.toggle('active');
        this.classList.toggle('active');
        this.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        log(`Menu ${isOpen ? 'aberto' : 'fechado'}`, 'info');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        }
    });
    
    log('Menu responsivo inicializado com sucesso', 'success');
}

// =============================================================================
// ANIMAÇÕES DE SCROLL
// =============================================================================

function initScrollAnimations() {
    log('Inicializando animações de scroll...', 'info');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                log(`Elemento animado: ${entry.target.tagName}`, 'info');
            }
        });
    }, observerOptions);
    
    // Adicionar classe fade-in a todos os articles e sections
    const elements = document.querySelectorAll('section, article');
    elements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    log(`${elements.length} elementos configurados para animação`, 'success');
}

// =============================================================================
// SMOOTH SCROLL PARA LINKS ÂNCORA
// =============================================================================

function initSmoothScroll() {
    log('Inicializando smooth scroll...', 'info');
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios ou apenas #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                log(`Scroll suave para: ${href}`, 'info');
            }
        });
    });
    
    log(`Smooth scroll configurado para ${links.length} links`, 'success');
}

// =============================================================================
// BOTÃO VOLTAR AO TOPO
// =============================================================================

function initBackToTop() {
    log('Inicializando botão voltar ao topo...', 'info');
    
    // Criar botão se não existir
    let backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        backToTopBtn.innerHTML = '↑';
        document.body.appendChild(backToTopBtn);
    }
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Ação do botão
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        log('Voltando ao topo da página', 'info');
    });
    
    log('Botão voltar ao topo inicializado', 'success');
}

// =============================================================================
// CONTADOR DE CARACTERES EM TEXTAREAS
// =============================================================================

function initCharacterCounter() {
    log('Inicializando contadores de caracteres...', 'info');
    
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        
        // Criar elemento contador
        const counter = document.createElement('small');
        counter.className = 'character-counter';
        counter.textContent = `0/${maxLength} caracteres`;
        
        // Inserir contador após o textarea
        textarea.after(counter);
        
        // Atualizar contador
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Adicionar classe de aviso quando próximo do limite
            if (currentLength > maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        });
    });
    
    log(`${textareas.length} contadores de caracteres inicializados`, 'success');
}

// =============================================================================
// HIGHLIGHT DO LINK ATIVO NO MENU
// =============================================================================

function initActiveNavLink() {
    log('Inicializando highlight de navegação ativa...', 'info');
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
            log(`Link ativo: ${linkPage}`, 'info');
        }
    });
    
    log('Navegação ativa configurada', 'success');
}

// =============================================================================
// LAZY LOADING DE IMAGENS
// =============================================================================

function initLazyLoading() {
    log('Inicializando lazy loading de imagens...', 'info');
    
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) {
        log('Nenhuma imagem configurada para lazy loading', 'warning');
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                img.setAttribute('src', src);
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                
                observer.unobserve(img);
                log(`Imagem carregada: ${src}`, 'info');
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    log(`${images.length} imagens configuradas para lazy loading`, 'success');
}

// =============================================================================
// TRATAMENTO DE LINKS EXTERNOS
// =============================================================================

function initExternalLinks() {
    log('Configurando links externos...', 'info');
    
    const links = document.querySelectorAll('a[href^="http"]');
    let count = 0;
    
    links.forEach(link => {
        // Verificar se não é link interno
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            count++;
        }
    });
    
    log(`${count} links externos configurados`, 'success');
}

// =============================================================================
// ACESSIBILIDADE - FOCUS VISIBLE
// =============================================================================

function initAccessibility() {
    log('Configurando melhorias de acessibilidade...', 'info');
    
    // Detectar uso de teclado vs mouse
    let usingKeyboard = false;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            usingKeyboard = true;
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        usingKeyboard = false;
        document.body.classList.remove('using-keyboard');
    });
    
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.prepend(skipLink);
    
    // Adicionar ID ao main se não existir
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
    
    log('Melhorias de acessibilidade aplicadas', 'success');
}

// =============================================================================
// INICIALIZAÇÃO PRINCIPAL
// =============================================================================

function init() {
    log('='.repeat(60), 'info');
    log(`Inicializando ${CONFIG.siteName} v${CONFIG.version}`, 'info');
    log('='.repeat(60), 'info');
    
    try {
        // Inicializar todos os módulos
        initMenuResponsivo();
        initActiveNavLink();
        initSmoothScroll();
        initBackToTop();
        initScrollAnimations();
        initCharacterCounter();
        initLazyLoading();
        initExternalLinks();
        initAccessibility();
        
        log('='.repeat(60), 'success');
        log('Todas as funcionalidades inicializadas com sucesso!', 'success');
        log('='.repeat(60), 'success');
        
        // Disparar evento customizado de inicialização completa
        document.dispatchEvent(new Event('appInitialized'));
        
    } catch (error) {
        log(`Erro na inicialização: ${error.message}`, 'error');
        console.error(error);
    }
}

// =============================================================================
// AGUARDAR CARREGAMENTO DO DOM
// =============================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =============================================================================
// EXPORTAR PARA USO EM OUTROS MÓDULOS (se necessário)
// =============================================================================

window.AppConfig = CONFIG;
window.AppLog = log;