/**
 * VALIDACAO.JS - Sistema de Validação de Formulários
 * Instituto Esperança
 * 
 * Este arquivo contém todas as funções de validação do formulário de cadastro,
 * incluindo validação em tempo real, mensagens de erro e verificação de dados.
 */

// =============================================================================
// CONFIGURAÇÕES DE VALIDAÇÃO
// =============================================================================

const VALIDATION_CONFIG = {
    messages: {
        required: 'Este campo é obrigatório',
        email: 'Digite um e-mail válido',
        cpf: 'CPF inválido',
        telefone: 'Telefone inválido',
        cep: 'CEP inválido',
        minLength: 'Mínimo de {min} caracteres',
        maxLength: 'Máximo de {max} caracteres',
        age: 'Você deve ter pelo menos 18 anos',
        terms: 'Você deve aceitar os termos',
        checkbox: 'Selecione pelo menos uma opção'
    },
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
        cep: /^\d{5}-\d{3}$/
    }
};

// =============================================================================
// FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS
// =============================================================================

/**
 * Valida CPF
 */
function validarCPF(cpf) {
    // Remove formatação
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

/**
 * Valida e-mail
 */
function validarEmail(email) {
    return VALIDATION_CONFIG.patterns.email.test(email);
}

/**
 * Valida telefone
 */
function validarTelefone(telefone) {
    return VALIDATION_CONFIG.patterns.telefone.test(telefone);
}

/**
 * Valida CEP
 */
function validarCEP(cep) {
    return VALIDATION_CONFIG.patterns.cep.test(cep);
}

/**
 * Valida idade mínima (18 anos)
 */
function validarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade >= 18;
}

// =============================================================================
// FUNÇÕES DE EXIBIÇÃO DE ERROS
// =============================================================================

/**
 * Exibe mensagem de erro no campo
 */
function mostrarErro(campo, mensagem) {
    // Remove erro anterior se existir
    removerErro(campo);
    
    // Adiciona classe de erro ao campo
    campo.classList.add('error');
    
    // Cria elemento de mensagem de erro
    const erro = document.createElement('span');
    erro.className = 'form-error';
    erro.textContent = mensagem;
    erro.setAttribute('role', 'alert');
    
    // Insere erro após o campo
    campo.parentElement.appendChild(erro);
    
    window.AppLog && window.AppLog(`Erro no campo ${campo.id}: ${mensagem}`, 'error');
}

/**
 * Remove mensagem de erro do campo
 */
function removerErro(campo) {
    campo.classList.remove('error');
    
    const erroExistente = campo.parentElement.querySelector('.form-error');
    if (erroExistente) {
        erroExistente.remove();
    }
}

/**
 * Exibe mensagem de sucesso no campo
 */
function mostrarSucesso(campo) {
    removerErro(campo);
    campo.classList.add('success');
    
    // Remove classe de sucesso após 2 segundos
    setTimeout(() => {
        campo.classList.remove('success');
    }, 2000);
}

// =============================================================================
// VALIDAÇÃO DE CAMPOS INDIVIDUAIS
// =============================================================================

/**
 * Valida um campo específico
 */
function validarCampo(campo) {
    const valor = campo.value.trim();
    const tipo = campo.type;
    const id = campo.id;
    
    // Campo obrigatório
    if (campo.hasAttribute('required') && !valor) {
        mostrarErro(campo, VALIDATION_CONFIG.messages.required);
        return false;
    }
    
    // Se não for obrigatório e estiver vazio, não valida
    if (!campo.hasAttribute('required') && !valor) {
        removerErro(campo);
        return true;
    }
    
    // Validações específicas por tipo de campo
    switch(id) {
        case 'email':
            if (!validarEmail(valor)) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.email);
                return false;
            }
            break;
            
        case 'cpf':
            if (!validarCPF(valor)) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.cpf);
                return false;
            }
            break;
            
        case 'telefone':
            if (!validarTelefone(valor)) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.telefone);
                return false;
            }
            break;
            
        case 'cep':
            if (!validarCEP(valor)) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.cep);
                return false;
            }
            break;
            
        case 'dataNascimento':
            if (!validarIdade(valor)) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.age);
                return false;
            }
            break;
            
        case 'nome':
            if (valor.length < 3) {
                mostrarErro(campo, VALIDATION_CONFIG.messages.minLength.replace('{min}', '3'));
                return false;
            }
            break;
    }
    
    // Validação de tamanho mínimo
    if (campo.hasAttribute('minlength')) {
        const minLength = parseInt(campo.getAttribute('minlength'));
        if (valor.length < minLength) {
            mostrarErro(campo, VALIDATION_CONFIG.messages.minLength.replace('{min}', minLength));
            return false;
        }
    }
    
    // Validação de tamanho máximo
    if (campo.hasAttribute('maxlength')) {
        const maxLength = parseInt(campo.getAttribute('maxlength'));
        if (valor.length > maxLength) {
            mostrarErro(campo, VALIDATION_CONFIG.messages.maxLength.replace('{max}', maxLength));
            return false;
        }
    }
    
    // Campo válido
    mostrarSucesso(campo);
    return true;
}

/**
 * Valida checkboxes obrigatórios
 */
function validarCheckboxGroup(fieldset) {
    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
    const algumMarcado = Array.from(checkboxes).some(cb => cb.checked);
    
    if (!algumMarcado && checkboxes[0].hasAttribute('required')) {
        const erro = document.createElement('span');
        erro.className = 'form-error';
        erro.textContent = VALIDATION_CONFIG.messages.checkbox;
        fieldset.appendChild(erro);
        return false;
    }
    
    return true;
}

/**
 * Valida termos e condições
 */
function validarTermos() {
    const termosCheckbox = document.querySelector('input[name="termos"]');
    const lgpdCheckbox = document.querySelector('input[name="lgpd"]');
    
    let valido = true;
    
    if (termosCheckbox && !termosCheckbox.checked) {
        mostrarErro(termosCheckbox, 'Você deve aceitar os Termos de Uso');
        valido = false;
    }
    
    if (lgpdCheckbox && !lgpdCheckbox.checked) {
        mostrarErro(lgpdCheckbox, 'Você deve aceitar a LGPD');
        valido = false;
    }
    
    return valido;
}

// =============================================================================
// VALIDAÇÃO COMPLETA DO FORMULÁRIO
// =============================================================================

/**
 * Valida o formulário inteiro
 */
function validarFormulario(form) {
    let formularioValido = true;
    let primeiroCampoInvalido = null;
    
    // Valida todos os campos de input, select e textarea
    const campos = form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            formularioValido = false;
            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = campo;
            }
        }
    });
    
    // Valida termos
    if (!validarTermos()) {
        formularioValido = false;
    }
    
    // Valida pelo menos uma forma de contato
    const contatoCheckboxes = form.querySelectorAll('input[name^="contato"]');
    const algumContatoMarcado = Array.from(contatoCheckboxes).some(cb => cb.checked);
    
    if (!algumContatoMarcado) {
        const fieldset = contatoCheckboxes[0].closest('fieldset');
        const erro = document.createElement('span');
        erro.className = 'form-error';
        erro.textContent = 'Selecione pelo menos uma forma de contato';
        fieldset.appendChild(erro);
        formularioValido = false;
    }
    
    // Foca no primeiro campo inválido
    if (primeiroCampoInvalido) {
        primeiroCampoInvalido.focus();
        primeiroCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return formularioValido;
}

// =============================================================================
// EXIBIÇÃO DE RESUMO DE ERROS
// =============================================================================

/**
 * Exibe um resumo dos erros no topo do formulário
 */
function exibirResumoErros(form) {
    // Remove resumo anterior se existir
    const resumoAnterior = form.querySelector('.alert-error');
    if (resumoAnterior) {
        resumoAnterior.remove();
    }
    
    const erros = form.querySelectorAll('.form-error');
    
    if (erros.length === 0) return;
    
    const resumo = document.createElement('div');
    resumo.className = 'alert alert-error';
    resumo.setAttribute('role', 'alert');
    
    const titulo = document.createElement('strong');
    titulo.textContent = `Foram encontrados ${erros.length} erro(s) no formulário:`;
    resumo.appendChild(titulo);
    
    const lista = document.createElement('ul');
    lista.style.marginTop = '10px';
    lista.style.paddingLeft = '20px';
    
    erros.forEach(erro => {
        const item = document.createElement('li');
        item.textContent = erro.textContent;
        lista.appendChild(item);
    });
    
    resumo.appendChild(lista);
    form.insertBefore(resumo, form.firstChild);
    
    // Scroll para o topo do formulário
    resumo.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================================================
// INICIALIZAÇÃO DA VALIDAÇÃO
// =============================================================================

/**
 * Inicializa a validação do formulário
 */
function initValidacao() {
    const form = document.getElementById('formCadastro');
    
    if (!form) {
        window.AppLog && window.AppLog('Formulário de cadastro não encontrado', 'warning');
        return;
    }
    
    window.AppLog && window.AppLog('Inicializando validação de formulário...', 'info');
    
    // Validação em tempo real (blur)
    const campos = form.querySelectorAll('input, select, textarea');
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            if (this.value) {
                validarCampo(this);
            }
        });
        
        // Remove erro ao digitar
        campo.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                removerErro(this);
            }
        });
    });
    
    // Validação ao submeter o formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        window.AppLog && window.AppLog('Validando formulário...', 'info');
        
        const valido = validarFormulario(form);
        
        if (valido) {
            window.AppLog && window.AppLog('Formulário válido! Enviando...', 'success');
            
            // Exibe mensagem de sucesso
            const sucesso = document.createElement('div');
            sucesso.className = 'alert alert-success';
            sucesso.innerHTML = '<strong>✓ Sucesso!</strong> Seu cadastro está sendo processado...';
            form.insertBefore(sucesso, form.firstChild);
            
            // Desabilita botão de envio
            const btnSubmit = form.querySelector('button[type="submit"]');
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Enviando...';
            }
            
            // Simula envio e redireciona após 2 segundos
            setTimeout(() => {
                form.submit();
            }, 2000);
            
        } else {
            window.AppLog && window.AppLog('Formulário inválido! Corrija os erros.', 'error');
            exibirResumoErros(form);
        }
    });
    
    // Limpar validação ao resetar formulário
    form.addEventListener('reset', function() {
        const erros = form.querySelectorAll('.form-error, .alert');
        erros.forEach(erro => erro.remove());
        
        const camposComErro = form.querySelectorAll('.error, .success');
        camposComErro.forEach(campo => {
            campo.classList.remove('error', 'success');
        });
        
        window.AppLog && window.AppLog('Formulário resetado', 'info');
    });
    
    window.AppLog && window.AppLog('Validação de formulário inicializada com sucesso', 'success');
}

// =============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// =============================================================================

// Aguarda o evento de inicialização da aplicação
document.addEventListener('appInitialized', initValidacao);

// Fallback caso o evento não seja disparado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initValidacao, 100);
    });
} else {
    setTimeout(initValidacao, 100);
}

// =============================================================================
// EXPORTAR FUNÇÕES PARA USO EXTERNO
// =============================================================================

window.ValidacaoForm = {
    validarCPF,
    validarEmail,
    validarTelefone,
    validarCEP,
    validarIdade,
    validarCampo,
    validarFormulario
};