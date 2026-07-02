# Meu Diario Pet - MVP React

Front-end do projeto Meu Diario Pet adaptado para o MVP de Desenvolvimento Front-end Avancado com React, React Router e Node.js.

## Descricao

A aplicacao foi reestruturada com componentizacao e roteamento para simular um sistema de acompanhamento de pets. O projeto utiliza leitura de JSON local com simulacao de requisicoes assincronas (sem chamadas reais para API externa), conforme exigencia do MVP.

## Funcionalidades

- Navegacao entre multiplas paginas com React Router
- Cadastro e busca de pets
- Diario individual por pet com cadastro e exclusao de registros
- Guia de cuidados com dicas de saude e comportamento
- Feedback de carregamento, sucesso, erro e estado vazio
- Rota 404 para URLs inexistentes
- Layout responsivo para desktop, tablet e celular

## Tecnologias

- Node.js
- React
- React Router DOM
- Vite
- CSS3

## Instalacao

1. Abra o terminal na pasta do front:

   ```bash
   cd meu_diario_pet_front
   ```

2. Instale as dependencias:

   ```bash
   npm install
   ```

3. Inicie em modo desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a URL exibida no terminal (geralmente http://localhost:5173).

## Scripts

- `npm run dev`: inicia servidor de desenvolvimento
- `npm run build`: gera build de producao
- `npm run preview`: serve localmente o build gerado

## Estrutura de Pastas

```
meu_diario_pet_front/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── FeedbackBanner.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PetCard.jsx
│   │   ├── PrimaryButton.jsx
│   │   ├── SearchBar.jsx
│   │   └── TooltipHint.jsx
│   ├── data/
│   │   └── mockData.json
│   ├── pages/
│   │   ├── CareTipsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PetDiaryPage.jsx
│   │   └── PetsPage.jsx
│   └── services/
│       └── mockApi.js
└── README.md
```

## Requisitos do MVP Atendidos

- Componentizacao com varias paginas e componentes reutilizaveis
- Reutilizacao de componentes como header, botao, card, busca, tooltip, modal e feedback
- Uso de estados, props e hooks
- Uso de useNavigate, useParams e useLocation
- Rota de erro 404
- Feedback visual, loading, mensagens condicionais e tooltips
- Interface adaptavel para diferentes tamanhos de tela

## Mapeamento da Rubrica (Pontuacao)

### 1) Componentizacao (3,5 pts)

- [0,5] Aplicacao dividida em 3+ paginas e componentes reutilizaveis.
   - Evidencias: src/pages/HomePage.jsx, src/pages/PetsPage.jsx, src/pages/PetDiaryPage.jsx, src/pages/CareTipsPage.jsx.
- [2,0] Reutilizacao de pelo menos 4 componentes.
   - Evidencias: src/components/AppHeader.jsx, src/components/PrimaryButton.jsx, src/components/SearchBar.jsx, src/components/PetCard.jsx, src/components/FeedbackBanner.jsx, src/components/TooltipHint.jsx, src/components/ConfirmModal.jsx, src/components/LoadingSpinner.jsx.
- [1,0] Solucao original (interface e interacoes diferentes do exemplo base).
   - Evidencias: layout autoral e moderno em src/styles.css, animacoes de entrada com RevealBlock (src/components/RevealBlock.jsx), badges de icones em src/components/IconBadge.jsx, fluxo de diario com confirmacao por modal.
- Observacao obrigatoria (simulacao de servidor via JSON): atendida.
   - Evidencias: src/data/mockData.json e src/services/mockApi.js.

### 2) React e Roteamento de Paginas (2,5 pts)

- [1,0] Uso correto de estado, props e hooks.
   - Evidencias: useState/useEffect nas paginas; passagem de props em componentes reutilizaveis.
- [1,0] Navegacao com React Router + 3 hooks de navegacao.
   - Evidencias:
      - Rotas: src/App.jsx
      - useNavigate: src/pages/HomePage.jsx e outras paginas
      - useParams: src/pages/PetDiaryPage.jsx
      - useLocation: src/components/AppHeader.jsx
- [0,5] Rota de erro para URL inexistente.
   - Evidencias: rota "*" em src/App.jsx e pagina src/pages/NotFoundPage.jsx.

### 3) Usabilidade (2,0 pts)

- [1,5] Elementos de experiencia do usuario.
   - Evidencias:
      - Feedback visual de sucesso/erro/aviso: src/components/FeedbackBanner.jsx
      - Tooltips: src/components/TooltipHint.jsx
      - Mensagens contextuais de vazio/erro: paginas de pets, diario e guia
      - Indicadores de carregamento: src/components/LoadingSpinner.jsx
- [0,5] Layout adaptavel (desktop, tablet e celular).
   - Evidencias: media queries e ajustes responsivos em src/styles.css.

### 4) Organizacao e Documentacao (2,0 pts)

- [0,5] Projeto hospedado publicamente no GitHub.
   - Status: pendente de publicacao publica (inserir link abaixo).
- [0,5] README com titulo, descricao e instalacao.
   - Status: atendido neste arquivo.
- [0,5] Estrutura clara de pastas e arquivos.
   - Evidencia: secao "Estrutura de Pastas".
- [0,5] Convencoes de nomenclatura e boas praticas.
   - Evidencias: componentes em PascalCase, organizacao em src/components, src/pages, src/services e src/data.

### Link do repositorio publico

- GitHub: [ADICIONE_AQUI_O_LINK_DO_REPOSITORIO]

## Observacoes

- Os dados sao inicializados a partir do arquivo JSON em src/data/mockData.json.
- As operacoes sao simuladas em src/services/mockApi.js com atraso artificial para representar requisicoes a servidor.
- O estado e persistido em localStorage para facilitar testes durante a apresentacao.