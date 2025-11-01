/**
 * MASCARAS.JS - Sistema de Máscaras para Inputs
 * Instituto Esperança
 * 
 * Este arquivo aplica máscaras automáticas nos campos de formulário
 * para melhorar a experiência do usuário e garantir formato correto dos dados.
 */

// =============================================================================
// FUNÇÕES DE MÁSCARA
// =============================================================================

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
function mascaraCPF(valor) {
    return valor
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Adiciona hífen
        .replace(/(-\d{2})\d+?$/, '$1'); // Impede mais de 2 dígitos após o hífen
}

/**
 * Aplica máscara de CNPJ (00.000.000/0000-00)
 */
function mascaraCNPJ(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Aplica máscara de Telefone (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    
    if (valor.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    } else {
        // Celular: (XX) XXXXX-XXXX
        return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
}

/**
 * Aplica máscara de CEP (00000-000)
 */
function mascaraCEP(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

/**
 * Aplica máscara de Data (DD/MM/AAAA)
 */
function mascaraData(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
}

/**
 * Aplica máscara de Hora (HH:MM)
 */
function mascaraHora(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1:$2')
        .replace(/(\d{2})\d+?$/, '$1');
}

/**
 * Aplica máscara de Moeda (R$ 0.000,00)
 */
function mascaraMoeda(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor === '') return '';
    valor = (parseInt(valor) / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return 'R$ ' + valor;
}

/**
 * Permite apenas números
 */
function apenasNumeros(valor) {
    return valor.replace(/\D/g, '');
}

/**
 * Permite apenas letras
 */
function apenasLetras(valor) {
    return valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}

/**
 * Capitaliza primeira letra de cada palavra
 */
function capitalizarNome(valor) {
    return valor
        .toLowerCase()
        .split(' ')
        .map(palavra => {
            if (palavra.length > 2) {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1);
            }
            return palavra;
        })
        .join(' ');
}

/**
 * Máscara de Cartão de Crédito (0000 0000 0000 0000)
 */
function mascaraCartaoCredito(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})\d+?$/, '$1');
}

/**
 * Máscara de RG (00.000.000-0)
 */
function mascaraRG(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1})/, '$1-$2')
        .replace(/(-\d{1})\d+?$/, '$1');
}

// =============================================================================
// APLICAÇÃO DE MÁSCARAS NOS CAMPOS
// =============================================================================

/**
 * Aplica máscara em um campo específico em tempo real
 */
function aplicarMascara(campo, tipoMascara) {
    console.log(`🎭 Aplicando máscara "${tipoMascara}" no campo:`, campo.id || campo.name);
    
    // Evento de input (dispara ao digitar)
    campo.addEventListener('input', function(e) {
        let valor = e.target.value;
        let cursorPos = e.target.selectionStart;
        let valorAnterior = valor;
        
        // Aplica a máscara conforme o tipo
        switch(tipoMascara) {
            case 'cpf':
                e.target.value = mascaraCPF(valor);
                break;
            case 'cnpj':
                e.target.value = mascaraCNPJ(valor);
                break;
            case 'telefone':
                e.target.value = mascaraTelefone(valor);
                break;
            case 'cep':
                e.target.value = mascaraCEP(valor);
                break;
            case 'data':
                e.target.value = mascaraData(valor);
                break;
            case 'hora':
                e.target.value = mascaraHora(valor);
                break;
            case 'moeda':
                e.target.value = mascaraMoeda(valor);
                break;
            case 'numero':
                e.target.value = apenasNumeros(valor);
                break;
            case 'letra':
                e.target.value = apenasLetras(valor);
                break;
            case 'nome':
                e.target.value = apenasLetras(valor);
                break;
            case 'cartao':
                e.target.value = mascaraCartaoCredito(valor);
                break;
            case 'rg':
                e.target.value = mascaraRG(valor);
                break;
        }
        
        // Mantém a posição do cursor
        if (e.target.value.length > valorAnterior.length) {
            // Ajusta cursor se caractere foi adicionado
            let diff = e.target.value.length - valorAnterior.length;
            e.target.setSelectionRange(cursorPos + diff, cursorPos + diff);
        }
    });
    
    // Evento de paste (colar texto)
    campo.addEventListener('paste', function(e) {
        setTimeout(() => {
            let valor = e.target.value;
            switch(tipoMascara) {
                case 'cpf': e.target.value = mascaraCPF(valor); break;
                case 'cnpj': e.target.value = mascaraCNPJ(valor); break;
                case 'telefone': e.target.value = mascaraTelefone(valor); break;
                case 'cep': e.target.value = mascaraCEP(valor); break;
                case 'data': e.target.value = mascaraData(valor); break;
                case 'numero': e.target.value = apenasNumeros(valor); break;
                case 'letra': e.target.value = apenasLetras(valor); break;
                case 'nome': e.target.value = apenasLetras(valor); break;
            }
        }, 10);
    });
    
    // Capitaliza nome ao sair do campo
    if (tipoMascara === 'nome') {
        campo.addEventListener('blur', function() {
            if (this.value) {
                this.value = capitalizarNome(this.value);
            }
        });
    }
}

// =============================================================================
// CONSULTA DE CEP (API ViaCEP)
// =============================================================================

/**
 * Busca endereço pelo CEP na API ViaCEP
 */
async function buscarCEP(cep) {
    // Remove formatação do CEP
    cep = cep.replace(/\D/g, '');
    
    console.log('🔍 Iniciando busca de CEP:', cep);
    
    // Verifica se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        console.log('❌ CEP inválido: precisa ter 8 dígitos');
        return null;
    }
    
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        console.log('📡 Fazendo requisição para:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            console.log('❌ Erro HTTP:', response.status);
            return null;
        }
        
        const data = await response.json();
        console.log('📦 Resposta recebida:', data);
        
        if (data.erro) {
            console.log('❌ CEP não encontrado no banco de dados');
            return null;
        }
        
        console.log('✅ CEP encontrado com sucesso!');
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar CEP:', error);
        return null;
    }
}

/**
 * Preenche campos de endereço automaticamente
 */
async function preencherEndereco(campoCEP) {
    const cep = campoCEP.value.replace(/\D/g, '');
    
    console.log('📍 Tentando preencher endereço para CEP:', cep);
    
    // Verifica se tem 8 dígitos
    if (cep.length !== 8) {
        console.log('⚠️ CEP incompleto, aguardando...');
        return false;
    }
    
    // Mostra loading
    let loader = campoCEP.parentElement.querySelector('.cep-loader');
    if (!loader) {
        loader = document.createElement('small');
        loader.className = 'cep-loader';
        loader.style.marginLeft = '10px';
        loader.style.color = '#2196f3';
        loader.style.fontWeight = 'bold';
        loader.style.fontSize = '0.9em';
        campoCEP.after(loader);
    }
    
    loader.style.display = 'inline-block';
    loader.textContent = '🔍 Buscando CEP...';
    
    // Remove mensagens antigas
    const mensagensAntigas = campoCEP.parentElement.querySelectorAll('.cep-mensagem');
    mensagensAntigas.forEach(m => m.remove());
    
    // Busca o CEP
    const dados = await buscarCEP(cep);
    
    // Esconde loading
    loader.style.display = 'none';
    
    if (!dados) {
        // Mostra erro
        const erro = document.createElement('small');
        erro.className = 'cep-mensagem';
        erro.textContent = '❌ CEP não encontrado. Verifique o número digitado.';
        erro.style.color = '#f44336';
        erro.style.display = 'block';
        erro.style.marginTop = '5px';
        erro.style.fontWeight = 'bold';
        
        campoCEP.after(erro);
        campoCEP.classList.add('error');
        
        console.log('❌ Não foi possível preencher o endereço');
        
        // Remove erro após 5 segundos
        setTimeout(() => {
            erro.remove();
            campoCEP.classList.remove('error');
        }, 5000);
        
        return false;
    }
    
    console.log('📝 Preenchendo campos com os dados...');
    
    // Preenche os campos
    const campoEndereco = document.getElementById('endereco');
    const campoCidade = document.getElementById('cidade');
    const campoEstado = document.getElementById('estado');
    
    if (dados.logradouro && campoEndereco) {
        campoEndereco.value = dados.logradouro;
        console.log('✓ Endereço preenchido:', dados.logradouro);
    }
    
    if (dados.localidade && campoCidade) {
        campoCidade.value = dados.localidade;
        console.log('✓ Cidade preenchida:', dados.localidade);
    }
    
    if (dados.uf && campoEstado) {
        campoEstado.value = dados.uf;
        console.log('✓ Estado preenchido:', dados.uf);
    }
    
    // Mostra mensagem de sucesso
    const sucesso = document.createElement('small');
    sucesso.className = 'cep-mensagem';
    sucesso.textContent = '✅ Endereço encontrado e preenchido automaticamente!';
    sucesso.style.color = '#4caf50';
    sucesso.style.display = 'block';
    sucesso.style.marginTop = '5px';
    sucesso.style.fontWeight = 'bold';
    
    campoCEP.after(sucesso);
    campoCEP.classList.add('success');
    
    console.log('✅ Endereço preenchido com sucesso!');
    
    // Remove mensagem após 4 segundos
    setTimeout(() => {
        sucesso.remove();
        campoCEP.classList.remove('success');
    }, 4000);
    
    // Foca no campo de endereço para complementar
    if (campoEndereco) {
        setTimeout(() => {
            campoEndereco.focus();
            campoEndereco.setSelectionRange(campoEndereco.value.length, campoEndereco.value.length);
        }, 300);
    }
    
    return true;
}

// =============================================================================
// INICIALIZAÇÃO DAS MÁSCARAS
// =============================================================================

/**
 * Inicializa todas as máscaras do formulário
 */
function initMascaras() {
    console.log('');
    console.log('='.repeat(60));
    console.log('🎭 INICIALIZANDO SISTEMA DE MÁSCARAS');
    console.log('='.repeat(60));
    
    // Mapeamento de IDs para tipos de máscara
    const mascaras = {
        'cpf': 'cpf',
        'cnpj': 'cnpj',
        'telefone': 'telefone',
        'celular': 'telefone',
        'cep': 'cep',
        'nome': 'nome',
        'cartao': 'cartao',
        'rg': 'rg'
    };
    
    // Aplica máscaras nos campos encontrados
    let contadorMascaras = 0;
    
    Object.keys(mascaras).forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            aplicarMascara(campo, mascaras[id]);
            contadorMascaras++;
        }
    });
    
    console.log(`✅ ${contadorMascaras} máscaras aplicadas nos campos`);
    
    // Configura busca automática de CEP
    const campoCEP = document.getElementById('cep');
    if (campoCEP) {
        console.log('');
        console.log('🔍 Configurando busca automática de CEP...');
        
        // Evento ao sair do campo (blur)
        campoCEP.addEventListener('blur', async function() {
            const cep = this.value.replace(/\D/g, '');
            console.log('');
            console.log(`📌 Campo CEP perdeu foco. Valor: ${this.value} (${cep.length} dígitos)`);
            
            if (cep.length === 8) {
                await preencherEndereco(this);
            } else if (cep.length > 0 && cep.length < 8) {
                console.log('⚠️ CEP incompleto, não foi buscado');
            }
        });
        
        // Também busca ao pressionar Enter
        campoCEP.addEventListener('keydown', async function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('⏎ Enter pressionado no campo CEP');
                const cep = this.value.replace(/\D/g, '');
                
                if (cep.length === 8) {
                    await preencherEndereco(this);
                    // Move para o próximo campo
                    const campoEndereco = document.getElementById('endereco');
                    if (campoEndereco) {
                        campoEndereco.focus();
                    }
                }
            }
        });
        
        // Busca automática ao completar 8 dígitos
        campoCEP.addEventListener('input', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                console.log('✓ CEP completo (8 dígitos) detectado!');
                // Aguarda 500ms para dar tempo do usuário terminar
                clearTimeout(this.timeoutBusca);
                this.timeoutBusca = setTimeout(() => {
                    preencherEndereco(this);
                }, 500);
            }
        });
        
        console.log('✅ Busca automática de CEP configurada');
        console.log('   - Ao sair do campo (Tab)');
        console.log('   - Ao pressionar Enter');
        console.log('   - Automaticamente após digitar 8 números');
    } else {
        console.log('⚠️ Campo CEP (#cep) não encontrado na página');
    }
    
    // Aplica máscara em campos com atributo data-mask
    const camposComMascara = document.querySelectorAll('[data-mask]');
    if (camposComMascara.length > 0) {
        console.log(`\n🎯 Encontrados ${camposComMascara.length} campos com data-mask`);
        camposComMascara.forEach(campo => {
            const tipoMascara = campo.getAttribute('data-mask');
            aplicarMascara(campo, tipoMascara);
            contadorMascaras++;
        });
    }
    
    console.log('');
    console.log('='.repeat(60));
    console.log(`✅ SISTEMA DE MÁSCARAS INICIALIZADO - ${contadorMascaras} máscaras ativas`);
    console.log('='.repeat(60));
    console.log('');
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Remove máscara de um valor
 */
function removerMascara(valor) {
    return valor.replace(/\D/g, '');
}

/**
 * Formata número de telefone para exibição
 */
function formatarTelefone(valor) {
    return mascaraTelefone(valor);
}

/**
 * Formata CPF para exibição
 */
function formatarCPF(valor) {
    return mascaraCPF(valor);
}

/**
 * Formata CEP para exibição
 */
function formatarCEP(valor) {
    return mascaraCEP(valor);
}

// =============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// =============================================================================

// Aguarda o DOM carregar completamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMascaras);
} else {
    // DOM já carregado, executa imediatamente
    initMascaras();
}

// =============================================================================
// EXPORTAR FUNÇÕES PARA USO EXTERNO
// =============================================================================

window.Mascaras = {
    cpf: mascaraCPF,
    cnpj: mascaraCNPJ,
    telefone: mascaraTelefone,
    cep: mascaraCEP,
    data: mascaraData,
    hora: mascaraHora,
    moeda: mascaraMoeda,
    numero: apenasNumeros,
    letra: apenasLetras,
    nome: capitalizarNome,
    cartao: mascaraCartaoCredito,
    rg: mascaraRG,
    remover: removerMascara,
    buscarCEP: buscarCEP,
    formatarTelefone,
    formatarCPF,
    formatarCEP
};