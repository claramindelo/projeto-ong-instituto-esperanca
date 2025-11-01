/**
 * UTILS.JS - Funções Utilitárias
 * Instituto Esperança
 * 
 * Biblioteca de funções auxiliares reutilizáveis em todo o projeto.
 * Inclui manipulação de strings, datas, números, DOM, performance e mais.
 */

// =============================================================================
// MANIPULAÇÃO DE STRINGS
// =============================================================================

/**
 * Capitaliza a primeira letra de uma string
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza a primeira letra de cada palavra
 */
function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ')
        .map(word => word.length > 2 ? capitalize(word) : word.toLowerCase())
        .join(' ');
}

/**
 * Converte string para slug (URL amigável)
 */
function slugify(str) {
    if (!str) return '';
    
    const map = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c', 'ñ': 'n'
    };
    
    return str
        .toLowerCase()
        .split('')
        .map(char => map[char] || char)
        .join('')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

/**
 * Trunca uma string e adiciona reticências
 */
function truncate(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
}

/**
 * Remove espaços extras de uma string
 */
function normalizeSpaces(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}

/**
 * Extrai apenas números de uma string
 */
function extractNumbers(str) {
    if (!str) return '';
    return str.replace(/\D/g, '');
}

/**
 * Verifica se string está vazia (inclui apenas espaços)
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * Gera string aleatória
 */
function randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// =============================================================================
// FORMATAÇÃO DE DATAS
// =============================================================================

/**
 * Formata data no formato brasileiro (DD/MM/YYYY)
 */
function formatarData(data) {
    if (!data) return '';
    
    const d = new Date(data);
    if (isNaN(d.getTime())) return '';
    
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
}

/**
 * Formata data com hora (DD/MM/YYYY HH:MM)
 */
function formatarDataHora(data) {
    if (!data) return '';
    
    const d = new Date(data);
    if (isNaN(d.getTime())) return '';
    
    const dataFormatada = formatarData(data);
    const hora = String(d.getHours()).padStart(2, '0');
    const minuto = String(d.getMinutes()).padStart(2, '0');
    
    return `${dataFormatada} ${hora}:${minuto}`;
}

/**
 * Calcula diferença entre datas em dias
 */
function diferencaDias(data1, data2) {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    const diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Retorna data relativa (ex: "há 2 dias", "há 3 horas")
 */
function dataRelativa(data) {
    const agora = new Date();
    const passado = new Date(data);
    const diff = agora - passado;
    
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(dias / 365);
    
    if (segundos < 60) return 'agora mesmo';
    if (minutos < 60) return `há ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    if (horas < 24) return `há ${horas} hora${horas > 1 ? 's' : ''}`;
    if (dias < 30) return `há ${dias} dia${dias > 1 ? 's' : ''}`;
    if (meses < 12) return `há ${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    return `há ${anos} ano${anos > 1 ? 's' : ''}`;
}

/**
 * Verifica se data é hoje
 */
function isHoje(data) {
    const hoje = new Date();
    const d = new Date(data);
    return d.getDate() === hoje.getDate() &&
           d.getMonth() === hoje.getMonth() &&
           d.getFullYear() === hoje.getFullYear();
}

// =============================================================================
// FORMATAÇÃO DE NÚMEROS E MOEDA
// =============================================================================

/**
 * Formata número como moeda brasileira
 */
function formatarMoeda(valor) {
    if (valor === null || valor === undefined) return 'R$ 0,00';
    
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numero);
}

/**
 * Formata número com separadores de milhares
 */
function formatarNumero(valor, casasDecimais = 0) {
    if (valor === null || valor === undefined) return '0';
    
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    }).format(numero);
}

/**
 * Formata número como porcentagem
 */
function formatarPorcentagem(valor, casasDecimais = 2) {
    if (valor === null || valor === undefined) return '0%';
    
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    }).format(numero / 100);
}

/**
 * Converte string de moeda para número
 */
function moedaParaNumero(valorMoeda) {
    if (!valorMoeda) return 0;
    
    return parseFloat(
        valorMoeda
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim()
    );
}

/**
 * Gera número aleatório entre min e max
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =============================================================================
// MANIPULAÇÃO DE ARRAYS
// =============================================================================

/**
 * Remove duplicados de um array
 */
function removerDuplicados(array) {
    return [...new Set(array)];
}

/**
 * Embaralha array aleatoriamente
 */
function embaralhar(array) {
    const novo = [...array];
    for (let i = novo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novo[i], novo[j]] = [novo[j], novo[i]];
    }
    return novo;
}

/**
 * Divide array em chunks (pedaços)
 */
function dividirArray(array, tamanho) {
    const resultado = [];
    for (let i = 0; i < array.length; i += tamanho) {
        resultado.push(array.slice(i, i + tamanho));
    }
    return resultado;
}

/**
 * Retorna item aleatório do array
 */
function itemAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// =============================================================================
// MANIPULAÇÃO DO DOM
// =============================================================================

/**
 * Seleciona elemento(s) do DOM
 */
function $(selector) {
    const elements = document.querySelectorAll(selector);
    return elements.length === 1 ? elements[0] : elements;
}

/**
 * Adiciona classe(s) a um elemento
 */
function addClass(element, ...classes) {
    if (!element) return;
    element.classList.add(...classes);
}

/**
 * Remove classe(s) de um elemento
 */
function removeClass(element, ...classes) {
    if (!element) return;
    element.classList.remove(...classes);
}

/**
 * Alterna classe em um elemento
 */
function toggleClass(element, className) {
    if (!element) return;
    element.classList.toggle(className);
}

/**
 * Verifica se elemento tem classe
 */
function hasClass(element, className) {
    if (!element) return false;
    return element.classList.contains(className);
}

/**
 * Oculta elemento
 */
function hide(element) {
    if (!element) return;
    element.style.display = 'none';
}

/**
 * Mostra elemento
 */
function show(element, display = 'block') {
    if (!element) return;
    element.style.display = display;
}

/**
 * Alterna visibilidade do elemento
 */
function toggle(element) {
    if (!element) return;
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

/**
 * Remove elemento do DOM
 */
function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Cria elemento HTML com atributos
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    if (content) {
        element.textContent = content;
    }
    
    return element;
}

// =============================================================================
// PERFORMANCE - DEBOUNCE E THROTTLE
// =============================================================================

/**
 * Debounce - Executa função após parar de chamar por X ms
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - Limita execução de função a uma vez por período
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================================================
// COOKIES
// =============================================================================

/**
 * Salva cookie
 */
function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Lê cookie
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Remove cookie
 */
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}

// =============================================================================
// LOCAL STORAGE
// =============================================================================

/**
 * Salva no localStorage (com JSON)
 */
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
        return false;
    }
}

/**
 * Lê do localStorage (com JSON)
 */
function getStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Erro ao ler do localStorage:', e);
        return null;
    }
}

/**
 * Remove do localStorage
 */
function removeStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Erro ao remover do localStorage:', e);
        return false;
    }
}

/**
 * Limpa todo o localStorage
 */
function clearStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (e) {
        console.error('Erro ao limpar localStorage:', e);
        return false;
    }
}

// =============================================================================
// DETECÇÃO DE DISPOSITIVO E NAVEGADOR
// =============================================================================

/**
 * Detecta se é dispositivo móvel
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta se é tablet
 */
function isTablet() {
    return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
}

/**
 * Detecta se é desktop
 */
function isDesktop() {
    return !isMobile() && !isTablet();
}

/**
 * Detecta tipo de dispositivo
 */
function getDeviceType() {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
}

/**
 * Detecta sistema operacional
 */
function getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    
    if (macosPlatforms.indexOf(platform) !== -1) return 'Mac OS';
    if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
    if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
    if (/Android/.test(userAgent)) return 'Android';
    if (/Linux/.test(platform)) return 'Linux';
    
    return 'Unknown';
}

/**
 * Detecta navegador
 */
function getBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
    if (userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
    if (userAgent.indexOf('Edge') > -1) return 'Edge';
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    
    return 'Unknown';
}

// =============================================================================
// VALIDAÇÕES AUXILIARES
// =============================================================================

/**
 * Valida URL
 */
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Valida se é número
 */
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Valida se objeto está vazio
 */
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

// =============================================================================
// UTILIDADES DIVERSAS
// =============================================================================

/**
 * Copia texto para área de transferência
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('✅ Texto copiado para área de transferência');
        return true;
    } catch (err) {
        console.error('❌ Erro ao copiar texto:', err);
        return false;
    }
}

/**
 * Scroll suave para elemento
 */
function scrollTo(element, offset = 0) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Scroll para o topo da página
 */
function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
}

/**
 * Aguarda X milissegundos (Promise)
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Executa função quando DOM estiver pronto
 */
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

/**
 * Formata bytes para tamanho legível
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Gera cor aleatória hexadecimal
 */
function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

/**
 * Detecta modo escuro ativo
 */
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Converte querystring para objeto
 */
function parseQueryString(url = window.location.search) {
    const params = new URLSearchParams(url);
    const obj = {};
    for (const [key, value] of params) {
        obj[key] = value;
    }
    return obj;
}

/**
 * Converte objeto para querystring
 */
function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
}

// =============================================================================
// INICIALIZAÇÃO E LOG
// =============================================================================

console.log('');
console.log('='.repeat(60));
console.log('🛠️  UTILS.JS CARREGADO COM SUCESSO');
console.log('='.repeat(60));
console.log('📦 Funções disponíveis:');
console.log('   - Strings: capitalize, slugify, truncate, etc.');
console.log('   - Datas: formatarData, dataRelativa, etc.');
console.log('   - Números: formatarMoeda, formatarPorcentagem, etc.');
console.log('   - DOM: $, addClass, show/hide, etc.');
console.log('   - Performance: debounce, throttle');
console.log('   - Storage: cookies, localStorage');
console.log('   - Dispositivo: isMobile, getOS, getBrowser');
console.log('   - E muito mais!');
console.log('='.repeat(60));
console.log('');

// =============================================================================
// EXPORTAR TODAS AS FUNÇÕES
// =============================================================================

window.Utils = {
    // Strings
    capitalize,
    capitalizeWords,
    slugify,
    truncate,
    normalizeSpaces,
    extractNumbers,
    isEmpty,
    randomString,
    
    // Datas
    formatarData,
    formatarDataHora,
    diferencaDias,
    dataRelativa,
    isHoje,
    
    // Números
    formatarMoeda,
    formatarNumero,
    formatarPorcentagem,
    moedaParaNumero,
    randomNumber,
    
    // Arrays
    removerDuplicados,
    embaralhar,
    dividirArray,
    itemAleatorio,
    
    // DOM
    $,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    hide,
    show,
    toggle,
    removeElement,
    createElement,
    
    // Performance
    debounce,
    throttle,
    
    // Storage
    setCookie,
    getCookie,
    deleteCookie,
    setStorage,
    getStorage,
    removeStorage,
    clearStorage,
    
    // Dispositivo
    isMobile,
    isTablet,
    isDesktop,
    getDeviceType,
    getOS,
    getBrowser,
    
    // Validações
    isValidURL,
    isNumber,
    isEmptyObject,
    
    // Diversos
    copyToClipboard,
    scrollTo,
    scrollToTop,
    sleep,
    ready,
    formatBytes,
    randomColor,
    isDarkMode,
    parseQueryString,
    objectToQueryString
};