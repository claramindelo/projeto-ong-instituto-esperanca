/**
 * SPA.JS - Single Page Application
 * Instituto Esperança
 * 
 * Sistema de navegação entre páginas sem recarregar,
 * com transições suaves e gerenciamento de histórico.
 */

// =============================================================================
// CONFIGURAÇÕES DO SPA
// =============================================================================

const SPA_CONFIG = {
    paginasDisponiveis: [
        'index.html',
        'projetos.html',
        'cadastro.html',
        'relatorios.html',
        'sucesso.html'
    ],
    transicaoAtiva: true,
    duracaoTransicao: 300, // millisegundos
    debug: true
};

// =============================================================================
// CACHE DE PÁGINAS
// =============================================================================

const cachePages = new Map();

// =============================================================================
// FUNÇÃO DE LOG
// =============================================================================

function logSPA(mensagem, tipo = 'info') {
    if (!SPA_CONFIG.debug) return;
    
    const estilos = {
        info: 'color: #2196F3; font-weight: bold',
        success: 'color: #4CAF50; font-weight: bold',
        warning: 'color: #FF9800; font-weight: bold',
        error: 'color: #F44336; font-weight: bold'
    };
    
    console.log(`%c[SPA] ${mensagem}`, estilos[tipo] || estilos.info);
}

// =============================================================================
// FUNÇÃO PARA BUSCAR CONTEÚDO DA PÁGINA
// =============================================================================

/**
 * Busca o conteúdo HTML de uma página
 */
async function buscarPagina(url) {
    logSPA(`Buscando página: ${url}`, 'info');
    
    // Verifica se já está em cache
    if (cachePages.has(url)) {
        logSPA(`Página ${url} encontrada no cache`, 'success');
        return cachePages.get(url);
    }
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Salva no cache
        cachePages.set(url, html);
        logSPA(`Página ${url} carregada e armazenada em cache`, 'success');
        
        return html;
        
    } catch (error) {
        logSPA(`Erro ao buscar página ${url}: ${error.message}`, 'error');
        return null;
    }
}

// =============================================================================
// FUNÇÃO PARA EXTRAIR CONTEÚDO PRINCIPAL
// =============================================================================

/**
 * Extrai apenas o conteúdo do <main> da página
 */
function extrairConteudoMain(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const mainContent = doc.querySelector('main');
    const titulo = doc.querySelector('title');
    
    return {
        conteudo: mainContent ? mainContent.innerHTML : html,
        titulo: titulo ? titulo.textContent : 'Instituto Esperança'
    };
}

// =============================================================================
// FUNÇÃO PARA ATUALIZAR CONTEÚDO DA PÁGINA
// =============================================================================

/**
 * Atualiza o conteúdo do <main> com transição suave
 */
async function atualizarConteudo(html, titulo) {
    const mainElement = document.querySelector('main');
    
    if (!mainElement) {
        logSPA('Elemento <main> não encontrado', 'error');
        return false;
    }
    
    // Transição de saída (fade out)
    if (SPA_CONFIG.transicaoAtiva) {
        mainElement.style.opacity = '0';
        mainElement.style.transform = 'translateY(20px)';
        await new Promise(resolve => setTimeout(resolve, SPA_CONFIG.duracaoTransicao));
    }
    
    // Atualiza conteúdo
    mainElement.innerHTML = html;
    
    // Atualiza título
    document.title = titulo;
    
    // Scroll para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Transição de entrada (fade in)
    if (SPA_CONFIG.transicaoAtiva) {
        await new Promise(resolve => setTimeout(resolve, 50));
        mainElement.style.opacity = '1';
        mainElement.style.transform = 'translateY(0)';
    }
    
    // Reinicializa funcionalidades JavaScript
    reinicializarScripts();
    
    logSPA('Conteúdo atualizado com sucesso', 'success');
    return true;
}

// =============================================================================
// FUNÇÃO PARA REINICIALIZAR SCRIPTS
// =============================================================================

/**
 * Reinicializa funcionalidades após carregar novo conteúdo
 */
function reinicializarScripts() {
    logSPA('Reinicializando scripts...', 'info');
    
    // Reinicializa máscaras se estiver na página de cadastro
    if (window.Mascaras && document.getElementById('formCadastro')) {
        // As máscaras já serão aplicadas automaticamente pelo initMascaras
        setTimeout(() => {
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
        }, 100);
    }
    
    // Reinicializa animações de scroll
    const sections = document.querySelectorAll('section, article');
    sections.forEach((el, index) => {
        el.classList.remove('fade-in-visible');
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            el.classList.add('fade-in-visible');
        }, 100);
    });
    
    // Atualiza link ativo no menu
    atualizarLinkAtivo();
    
    logSPA('Scripts reinicializados', 'success');
}

// =============================================================================
// FUNÇÃO PARA ATUALIZAR LINK ATIVO NO MENU
// =============================================================================

/**
 * Marca o link ativo no menu de navegação
 */
function atualizarLinkAtivo() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === paginaAtual || 
            (paginaAtual === '' && href === 'index.html')) {
            link.classList.add('active');
            logSPA(`Link ativo atualizado: ${href}`, 'info');
        }
    });
}

// =============================================================================
// FUNÇÃO PRINCIPAL DE NAVEGAÇÃO
// =============================================================================

/**
 * Navega para uma nova página usando SPA
 */
async function navegarPara(url, adicionarHistorico = true) {
    logSPA('', 'info');
    logSPA('='.repeat(60), 'info');
    logSPA(`NAVEGANDO PARA: ${url}`, 'info');
    logSPA('='.repeat(60), 'info');
    
    // Verifica se a página está na lista de páginas disponíveis
    const nomeArquivo = url.split('/').pop();
    if (!SPA_CONFIG.paginasDisponiveis.includes(nomeArquivo)) {
        logSPA(`Página ${nomeArquivo} não está configurada para SPA`, 'warning');
        return false;
    }
    
    // Busca o conteúdo da página
    const html = await buscarPagina(url);
    
    if (!html) {
        logSPA('Falha ao carregar página, usando navegação tradicional', 'warning');
        window.location.href = url;
        return false;
    }
    
    // Extrai conteúdo principal
    const { conteudo, titulo } = extrairConteudoMain(html);
    
    // Atualiza o conteúdo
    const sucesso = await atualizarConteudo(conteudo, titulo);
    
    if (!sucesso) {
        return false;
    }
    
    // Adiciona ao histórico do navegador
    if (adicionarHistorico) {
        history.pushState({ url }, titulo, url);
        logSPA('URL adicionada ao histórico', 'success');
    }
    
    // Dispara evento customizado
    window.dispatchEvent(new CustomEvent('spa:navegacao', { 
        detail: { url, titulo } 
    }));
    
    logSPA('='.repeat(60), 'success');
    logSPA('NAVEGAÇÃO CONCLUÍDA COM SUCESSO!', 'success');
    logSPA('='.repeat(60), 'success');
    logSPA('', 'info');
    
    return true;
}

// =============================================================================
// INTERCEPTAR CLIQUES NOS LINKS
// =============================================================================

/**
 * Intercepta cliques em links para usar navegação SPA
 */
function interceptarLinks() {
    logSPA('Configurando interceptação de links...', 'info');
    
    document.addEventListener('click', function(e) {
        // Verifica se clicou em um link ou dentro de um link
        const link = e.target.closest('a');
        
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Ignora links externos, âncoras e links especiais
        if (!href || 
            href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('#') ||
            link.hasAttribute('target') ||
            link.hasAttribute('download')) {
            return;
        }
        
        // Verifica se é uma página do SPA
        const nomeArquivo = href.split('/').pop();
        if (!SPA_CONFIG.paginasDisponiveis.includes(nomeArquivo)) {
            return;
        }
        
        // Previne navegação padrão
        e.preventDefault();
        
        // Navega usando SPA
        navegarPara(href);
    });
    
    logSPA('Interceptação de links configurada', 'success');
}

// =============================================================================
// GERENCIAR HISTÓRICO DO NAVEGADOR (BOTÕES VOLTAR/AVANÇAR)
// =============================================================================

/**
 * Gerencia navegação pelos botões voltar/avançar do navegador
 */
function gerenciarHistorico() {
    logSPA('Configurando gerenciamento de histórico...', 'info');
    
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.url) {
            logSPA(`Navegação via histórico: ${e.state.url}`, 'info');
            navegarPara(e.state.url, false);
        } else {
            // Se não tem estado, recarrega a página
            logSPA('Estado não encontrado, recarregando página', 'warning');
            window.location.reload();
        }
    });
    
    logSPA('Gerenciamento de histórico configurado', 'success');
}

// =============================================================================
// PRÉ-CARREGAR PÁGINAS
// =============================================================================

/**
 * Pré-carrega páginas em segundo plano
 */
async function preCarregarPaginas() {
    logSPA('Iniciando pré-carregamento de páginas...', 'info');
    
    const paginasParaPreCarregar = SPA_CONFIG.paginasDisponiveis.filter(
        pagina => pagina !== window.location.pathname.split('/').pop()
    );
    
    for (const pagina of paginasParaPreCarregar) {
        // Aguarda 2 segundos entre cada carregamento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (!cachePages.has(pagina)) {
            await buscarPagina(pagina);
            logSPA(`Página pré-carregada: ${pagina}`, 'success');
        }
    }
    
    logSPA('Todas as páginas foram pré-carregadas', 'success');
}

// =============================================================================
// ADICIONAR ESTILOS DE TRANSIÇÃO
// =============================================================================

/**
 * Adiciona estilos CSS para as transições
 */
function adicionarEstilosTransicao() {
    const style = document.createElement('style');
    style.textContent = `
        main {
            transition: opacity ${SPA_CONFIG.duracaoTransicao}ms ease-in-out,
                        transform ${SPA_CONFIG.duracaoTransicao}ms ease-in-out;
        }
        
        /* Link ativo no menu */
        nav a.active {
            color: var(--color-secondary, #FF6B35);
            font-weight: bold;
            border-bottom: 2px solid var(--color-secondary, #FF6B35);
        }
        
        /* Indicador de carregamento */
        .spa-loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, 
                var(--color-primary, #4CAF50) 0%, 
                var(--color-secondary, #FF6B35) 100%);
            z-index: 9999;
            animation: loading 1s ease-in-out infinite;
        }
        
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    logSPA('Estilos de transição adicionados', 'success');
}

// =============================================================================
// FUNÇÃO PARA MOSTRAR INDICADOR DE CARREGAMENTO
// =============================================================================

/**
 * Mostra barra de carregamento no topo
 */
function mostrarCarregamento() {
    let loader = document.querySelector('.spa-loading');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'spa-loading';
        document.body.appendChild(loader);
    }
}

/**
 * Esconde barra de carregamento
 */
function esconderCarregamento() {
    const loader = document.querySelector('.spa-loading');
    if (loader) {
        loader.remove();
    }
}

// =============================================================================
// INICIALIZAÇÃO DO SPA
// =============================================================================

/**
 * Inicializa o sistema SPA
 */
function initSPA() {
    logSPA('', 'info');
    logSPA('='.repeat(60), 'info');
    logSPA('INICIALIZANDO SISTEMA SPA', 'info');
    logSPA('='.repeat(60), 'info');
    
    // Adiciona estilos
    adicionarEstilosTransicao();
    
    // Intercepta cliques em links
    interceptarLinks();
    
    // Gerencia histórico
    gerenciarHistorico();
    
    // Atualiza link ativo inicial
    atualizarLinkAtivo();
    
    // Adiciona estado inicial ao histórico
    const paginaAtual = window.location.pathname;
    const tituloAtual = document.title;
    history.replaceState({ url: paginaAtual }, tituloAtual, paginaAtual);
    
    logSPA('Estado inicial adicionado ao histórico', 'success');
    
    // Pré-carrega páginas em background (após 3 segundos)
    setTimeout(() => {
        preCarregarPaginas();
    }, 3000);
    
    logSPA('='.repeat(60), 'success');
    logSPA('SISTEMA SPA INICIALIZADO COM SUCESSO!', 'success');
    logSPA('='.repeat(60), 'success');
    logSPA('', 'info');
}

// =============================================================================
// EXPORTAR FUNÇÕES
// =============================================================================

window.SPA = {
    navegarPara,
    preCarregarPaginas,
    limparCache: () => {
        cachePages.clear();
        logSPA('Cache de páginas limpo', 'success');
    },
    configurar: (opcoes) => {
        Object.assign(SPA_CONFIG, opcoes);
        logSPA('Configurações atualizadas', 'success');
    }
};

// =============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// =============================================================================

// Aguarda o DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSPA);
} else {
    initSPA();
}

// Listener para o evento customizado de navegação
window.addEventListener('spa:navegacao', function(e) {
    logSPA(`Evento spa:navegacao disparado para: ${e.detail.url}`, 'info');
});