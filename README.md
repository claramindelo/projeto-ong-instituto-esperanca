# 🌟 Instituto Esperança - Site Institucional

![Status](https://img.shields.io/badge/status-concluído-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Acessibilidade](https://img.shields.io/badge/WCAG_2.1-AA-blue)

## 📋 Sobre o Projeto

Site institucional desenvolvido para o **Instituto Esperança**, uma ONG dedicada a transformar vidas através de projetos sociais, educação e inclusão. O projeto foi desenvolvido como parte da disciplina de Desenvolvimento Web, aplicando as melhores práticas de HTML5, CSS3 e JavaScript.

### 🎯 Objetivos

- Apresentar a organização e seus valores
- Divulgar projetos sociais em andamento
- Facilitar o cadastro de voluntários e doadores
- Promover transparência através de relatórios públicos
- Oferecer uma experiência de usuário acessível e moderna

---

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **Sistema SPA (Single Page Application)**: Navegação rápida sem recarregamento de página
- **Formulário de Cadastro Completo**: Com validação em tempo real
- **Validação de Dados**: CPF, e-mail, telefone, CEP com algoritmos robustos
- **Máscaras Automáticas**: Formatação automática de CPF, telefone e CEP
- **Busca de CEP Automática**: Integração com API ViaCEP
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessibilidade WCAG 2.1**: Navegação por teclado e suporte a leitores de tela
- **Animações Suaves**: Transições e efeitos visuais modernos

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS, Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas

### APIs Externas

- **ViaCEP**: Busca automática de endereços por CEP

### Ferramentas de Desenvolvimento

- **Git/GitHub**: Controle de versão
- **VS Code**: Editor de código
- **Chrome DevTools**: Debug e testes

---

## 📁 Estrutura do Projeto

```
projeto-ong/
│
├── index.html              # Página inicial
├── projetos.html           # Página de projetos sociais
├── cadastro.html           # Formulário de cadastro
├── relatorios.html         # Relatórios de transparência
├── sucesso.html            # Página de confirmação
│
├── estilos/                # Arquivos CSS
│   ├── variables.css       # Variáveis CSS (cores, fontes, espaçamentos)
│   ├── layout.css          # Layout geral (header, footer, grid)
│   ├── components.css      # Componentes reutilizáveis
│   ├── forms.css           # Estilização de formulários
│   └── responsive.css      # Media queries para responsividade
│
├── js/                     # Arquivos JavaScript
│   ├── main.js             # Inicialização e funções gerais
│   ├── mascaras.js         # Máscaras de input (CPF, telefone, CEP)
│   ├── validacao.js        # Validação de formulários
│   └── spa.js              # Sistema Single Page Application
│
├── imagens/                # Assets de imagem
│   ├── logo.jpg
│   ├── banner-*.jpg
│   └── ...
│
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

---

## 💻 Como Executar o Projeto

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para API de CEP)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/claramindelo/projeto-ong-instituto-esperanca
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd projeto-ong
   ```

3. **Abra o arquivo `index.html` no navegador**
   - Opção 1: Clique duas vezes no arquivo
   - Opção 2: Use uma extensão como Live Server no VS Code
   - Opção 3: Arraste o arquivo para o navegador

### Execução Local

Não é necessário servidor web, mas é recomendado usar:

- **VS Code + Live Server Extension**
- **Python HTTP Server**: `python -m http.server 8000`
- **Node.js HTTP Server**: `npx http-server`

---

## 🎨 Funcionalidades Detalhadas

### 1. Sistema de Navegação SPA

O site utiliza navegação SPA (Single Page Application) que proporciona:

- ⚡ Carregamento instantâneo entre páginas
- 🔄 Transições suaves
- 💾 Cache de páginas visitadas
- 🔙 Suporte a botões Voltar/Avançar do navegador
- 📱 Melhor experiência mobile

### 2. Validação de Formulários

O formulário de cadastro possui validação completa:

- ✅ **CPF**: Validação matemática dos dígitos verificadores
- ✅ **E-mail**: Formato válido com regex
- ✅ **Telefone**: Suporte para fixo e celular
- ✅ **CEP**: Formato e busca automática de endereço
- ✅ **Idade**: Verificação de maioridade (18+)
- ✅ **Campos obrigatórios**: Feedback visual imediato

### 3. Máscaras Automáticas

Formatação em tempo real durante a digitação:

- **CPF**: `123.456.789-00`
- **Telefone**: `(41) 99999-8888`
- **CEP**: `80000-000`

### 4. Busca Automática de CEP

Integração com a API ViaCEP:

- 🔍 Busca automática ao completar 8 dígitos
- 📍 Preenchimento automático de: Endereço, Cidade, Estado
- ⚡ Feedback visual de sucesso/erro
- 🚀 Cache de CEPs já consultados

### 5. Acessibilidade

Conformidade com **WCAG 2.1 Nível AA**:

- ⌨️ Navegação completa por teclado
- 🔊 Suporte a leitores de tela (ARIA labels)
- 🎨 Contraste de cores adequado (mínimo 4.5:1)
- 📱 Design responsivo e touch-friendly
- 🎯 Foco visível em elementos interativos

---

## 🧪 Testes

### Testado em:

- ✅ Google Chrome (v120+)
- ✅ Mozilla Firefox (v121+)
- ✅ Microsoft Edge (v120+)
- ✅ Safari (v17+)

### Dispositivos:

- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667, 414x896)

### Validações:

- ✅ [W3C HTML Validator](https://validator.w3.org/)
- ✅ [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- ✅ [WAVE Web Accessibility](https://wave.webaim.org/)

---

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: até 767px

Técnicas utilizadas:
- Media Queries
- Flexbox
- CSS Grid
- Unidades relativas (rem, em, %, vw, vh)

---

## ♿ Acessibilidade

### Recursos Implementados

- **Navegação por Teclado**: Todos os elementos interativos acessíveis via Tab
- **ARIA Labels**: Descrições para leitores de tela
- **Contraste**: Mínimo de 4.5:1 para textos
- **Semântica HTML5**: Uso correto de tags estruturais
- **Skip Links**: "Pular para conteúdo principal"
- **Foco Visível**: Indicação clara do elemento focado

### Conformidade

✅ **WCAG 2.1 Nível AA**

---

## 🎯 Próximas Melhorias

- [ ] Adicionar sistema de busca
- [ ] Implementar modo escuro
- [ ] Criar painel administrativo
- [ ] Adicionar mais idiomas (EN, ES)
- [ ] Integração com redes sociais
- [ ] Sistema de newsletter
- [ ] PWA (Progressive Web App)
- [ ] Otimização de imagens (WebP)

---

## 👥 Autores

- **Clara Mindelo** - *Desenvolvimento Completo* - [GitHub](https://github.com/claramindelo)

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Desenvolvimento Web.

---

## 🙏 Agradecimentos

- Professores e tutores da disciplina
- Comunidade open source
- API ViaCEP pela disponibilização gratuita

---

## 📞 Contato

**Instituto Esperança** (Fictício - Projeto Educacional)

- 📧 Email: contato@institutoesperanca.org.br
- 📱 Telefone: (41) 3333-4444
- 📍 Endereço: Rua da Solidariedade, 123 - Centro - Curitiba/PR

---

## 📊 Estatísticas do Projeto

- **Linhas de Código**: ~3.000+
- **Páginas HTML**: 5
- **Arquivos CSS**: 5
- **Arquivos JavaScript**: 4
- **Commits**: 50+
- **Tempo de Desenvolvimento**: 4 semanas

---

<p align="center">
  Desenvolvido com ❤️ e ☕ para transformar vidas através da tecnologia
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Topo</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar-o-projeto">Como Executar</a> •
  <a href="#-contato">Contato</a>
</p>