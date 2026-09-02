# 🏋️ FitLog

<p align="center">
  <strong>Seu treino organizado. Seu progresso registrado.</strong>
</p>

<p align="center">
  Aplicativo mobile desenvolvido para auxiliar usuários no gerenciamento e acompanhamento de exercícios de academia.
</p>

---

## 📱 Sobre o projeto

O **FitLog** é um aplicativo mobile desenvolvido em **React Native** com o objetivo de facilitar o gerenciamento de treinos de academia.

A aplicação permite que o usuário cadastre exercícios contendo informações importantes para seu treino, como nome do exercício, grupo muscular, quantidade de séries, repetições e carga utilizada.

Além do cadastro, o usuário pode acompanhar todos os exercícios registrados, editar suas informações, marcar exercícios como concluídos e removê-los quando necessário.

Os dados são armazenados localmente no dispositivo utilizando **AsyncStorage**, permitindo que as informações permaneçam salvas mesmo após o fechamento do aplicativo.

Este projeto foi desenvolvido como atividade prática para aplicar conceitos de desenvolvimento mobile, incluindo **componentização, FlatList, CRUD completo e persistência de dados**.

---

# 🎯 Objetivo

O principal objetivo do FitLog é fornecer uma ferramenta simples e intuitiva para que usuários possam organizar seus treinos de academia.

Com o aplicativo, é possível:

* 🏋️ Registrar exercícios;
* 📋 Visualizar os exercícios cadastrados;
* ✏️ Editar informações dos exercícios;
* ✅ Marcar exercícios como concluídos;
* 🗑️ Excluir exercícios;
* 💾 Manter os dados salvos no dispositivo.

---

# 🚀 Funcionalidades

## ➕ Cadastro de exercícios

O usuário pode cadastrar um novo exercício informando:

* Nome do exercício;
* Grupo muscular;
* Quantidade de séries;
* Quantidade de repetições;
* Carga utilizada.

Exemplo:

```text
Nome: Supino Reto
Grupo Muscular: Peito
Séries: 4
Repetições: 10
Carga: 30kg
```

---

## 📋 Listagem de exercícios

Todos os exercícios cadastrados são exibidos na tela principal do aplicativo.

A listagem é implementada utilizando o componente:

```jsx
FlatList
```

Cada item apresenta as principais informações do exercício.

Exemplo:

```text
🏋️ Supino Reto

Grupo muscular: Peito
4 séries × 10 repetições
Carga: 30kg

Status: ⏳ Pendente

[ Concluir ] [ Editar ] [ Excluir ]
```

---

## ✏️ Atualização de exercícios

O usuário pode editar as informações de um exercício previamente cadastrado.

É possível alterar:

* Nome;
* Grupo muscular;
* Séries;
* Repetições;
* Carga.

---

## ✅ Conclusão de exercícios

O aplicativo permite alterar o status de um exercício.

Estados disponíveis:

```text
⏳ Pendente
```

e

```text
✅ Concluído
```

Essa funcionalidade representa uma operação de atualização dentro do CRUD.

---

## 🗑️ Exclusão de exercícios

O usuário pode remover exercícios que não deseja mais manter na lista.

Ao excluir um exercício:

```text
Exercício selecionado
        ↓
Identificação pelo ID
        ↓
Remoção da lista
        ↓
Atualização do AsyncStorage
        ↓
Interface atualizada
```

---

# 🔄 CRUD

O projeto implementa um CRUD completo.

| Operação | Funcionalidade                         |
| -------- | -------------------------------------- |
| CREATE   | Cadastrar um novo exercício            |
| READ     | Listar os exercícios cadastrados       |
| UPDATE   | Editar informações ou alterar o status |
| DELETE   | Excluir um exercício                   |

---

# 🧠 Arquitetura do projeto

O projeto foi organizado separando responsabilidades entre interface, regras de negócio e persistência.

```text
┌─────────────────────┐
│      INTERFACE      │
│                     │
│ Screens             │
│ Components          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      SERVICES       │
│                     │
│ CRUD                │
│ Regras de negócio   │
│ Validações          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      STORAGE        │
│                     │
│ AsyncStorage        │
│ Persistência        │
└─────────────────────┘
```

---

# 📂 Estrutura do projeto

```text
FitLog/
│
├── assets/
│
├── src/
│   │
│   ├── components/
│   │   ├── ExercicioItem.jsx
│   │   ├── Input.jsx
│   │   └── Botao.jsx
│   │
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   └── CadastroScreen.jsx
│   │
│   ├── services/
│   │   └── exercicioService.js
│   │
│   ├── storage/
│   │   └── exercicioStorage.js
│   │
│   ├── utils/
│   │   └── exercicioValidator.js
│   │
│   └── hooks/
│       └── useExercicios.js
│
├── App.jsx
├── package.json
└── README.md
```

---

# ⚙️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

* React Native;
* Expo;
* JavaScript;
* JSX;
* AsyncStorage;
* React Navigation;
* Git;
* GitHub.

---

# 💾 Persistência de dados

Para armazenar os dados localmente, foi utilizado o **AsyncStorage**.

Os exercícios são convertidos para JSON antes de serem armazenados.

Fluxo:

```text
Array JavaScript
       ↓
JSON.stringify()
       ↓
AsyncStorage
       ↓
Dados persistidos
```

Ao recuperar os dados:

```text
AsyncStorage
       ↓
JSON.parse()
       ↓
Array JavaScript
       ↓
Aplicação
```

---

## 📌 Por que utilizamos AsyncStorage?

A escolha do AsyncStorage foi baseada na complexidade do projeto.

O FitLog trabalha com uma quantidade relativamente pequena de dados e não necessita de relacionamentos complexos entre tabelas.

Por esse motivo, utilizar SQLite seria uma solução mais complexa do que o necessário para o escopo atual do projeto.

O AsyncStorage oferece uma solução simples e eficiente para armazenar os exercícios localmente no dispositivo.

---

# 🗂️ Modelo de dados

Cada exercício possui a seguinte estrutura:

```javascript
{
  id: "123456",

  nome: "Supino Reto",

  grupoMuscular: "Peito",

  series: 4,

  repeticoes: 10,

  carga: 30,

  concluido: false,

  criadoEm: "2026-09-02T14:00:00.000Z"
}
```

---

# ⚙️ Fluxo do sistema

O funcionamento da aplicação segue o fluxo:

```text
Usuário
   │
   ▼
Interface Mobile
   │
   ▼
Formulário / Botões
   │
   ▼
Service
   │
   ▼
Validação dos dados
   │
   ▼
CRUD
   │
   ▼
Storage
   │
   ▼
AsyncStorage
```

---

# 🔧 Camada de Storage

A camada de Storage é responsável exclusivamente pela comunicação com o AsyncStorage.

Arquivo:

```text
src/storage/exercicioStorage.js
```

Principais responsabilidades:

```javascript
buscarExercicios()
```

```javascript
salvarExercicios()
```

Essa separação evita que componentes da interface tenham acesso direto à lógica de persistência.

---

# 🧩 Camada de Services

A camada Service contém as regras de negócio e as operações CRUD.

Arquivo:

```text
src/services/exercicioService.js
```

Principais funções:

```javascript
criarExercicio()
```

```javascript
listarExercicios()
```

```javascript
atualizarExercicio()
```

```javascript
alterarStatusExercicio()
```

```javascript
excluirExercicio()
```

---

# ✔️ Validação dos dados

Antes de salvar um exercício, os dados são validados.

São verificadas informações como:

* Nome obrigatório;
* Grupo muscular obrigatório;
* Séries maiores que zero;
* Repetições maiores que zero;
* Carga válida.

Fluxo:

```text
Dados recebidos
       │
       ▼
Validação
       │
       ▼
Dados válidos?
   ┌───┴───┐
   │       │
  NÃO     SIM
   │       │
   ▼       ▼
 Erro    Salvar
```

---

# 🖥️ Interface

A interface foi desenvolvida pensando em dispositivos móveis.

Os principais componentes utilizados são:

### FlatList

Utilizado para renderizar a lista de exercícios de forma organizada.

### TextInput

Utilizado para capturar os dados do formulário.

### TouchableOpacity

Utilizado para criar botões interativos.

### Componentização

A interface foi dividida em componentes reutilizáveis para melhorar a organização e manutenção do código.

---

# 🛠️ Como executar o projeto

## Pré-requisitos

Antes de iniciar, é necessário possuir instalado:

* Node.js;
* npm;
* Expo Go no celular ou um emulador Android/iOS.

---

## 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## 2. Entre na pasta do projeto

```bash
cd FitLog
```

---

## 3. Instale as dependências

```bash
npm install
```

---

## 4. Instale o AsyncStorage

Caso necessário:

```bash
npx expo install @react-native-async-storage/async-storage
```

---

## 5. Execute o projeto

```bash
npx expo start
```

Após iniciar o Expo, será possível executar o projeto através de:

* Expo Go;
* Emulador Android;
* Emulador iOS;
* Navegador.

---

# 🌿 Organização das Branches

Para permitir a participação dos dois integrantes no desenvolvimento, o projeto foi dividido em branches.

```text
main
│
├── feature/frontend
│
└── feature/storage-crud
```

---

## 🎨 feature/frontend

Responsável principalmente pela interface e experiência do usuário.

Principais responsabilidades:

* Desenvolvimento das telas;
* Componentização;
* FlatList;
* Formulários;
* Estilização;
* Navegação.

Arquivos relacionados:

```text
components/
screens/
```

---

## ⚙️ feature/storage-crud

Responsável pela lógica de dados da aplicação.

Principais responsabilidades:

* Configuração do AsyncStorage;
* Persistência de dados;
* CRUD;
* Validações;
* Regras de negócio;
* Services.

Arquivos relacionados:

```text
storage/
services/
utils/
```

---

# 🔀 Fluxo de desenvolvimento com Git

O desenvolvimento segue a seguinte estrutura:

```text
                 main
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
feature/frontend    feature/storage-crud
         │                   │
         └─────────┬─────────┘
                   │
                   ▼
             Pull Request
                   │
                   ▼
                  main
```

Cada integrante realiza commits relacionados às funcionalidades desenvolvidas em sua respectiva branch.

---

# 👥 Integrantes

<table>
  <tr>
    <td align="center">
      <strong>Jonas Daniel de Brito Lopes</strong><br>
      Desenvolvimento Mobile / Frontend / Integração
    </td>
    <td align="center">
      <strong>Vinicius Valle Rodrigues</strong><br>
      Persistência / CRUD / Lógica de Dados
    </td>
  </tr>
</table>

---

# 📚 Conceitos aplicados

Durante o desenvolvimento do FitLog foram aplicados os seguintes conceitos:

* Desenvolvimento Mobile;
* React Native;
* Componentização;
* FlatList;
* Estados com useState;
* Efeitos com useEffect;
* CRUD;
* Persistência local;
* AsyncStorage;
* JSON;
* Separação de responsabilidades;
* Validação de dados;
* Git;
* GitHub;
* Branches;
* Pull Requests.

---

# 🎓 Objetivos acadêmicos

O projeto foi desenvolvido para aplicar conhecimentos relacionados às seguintes capacidades:

* Projetar interfaces para dispositivos móveis;
* Implementar código respeitando as características da plataforma mobile;
* Persistir dados em dispositivos móveis;
* Trabalhar com componentização;
* Implementar operações CRUD;
* Utilizar controle de versão colaborativo.

---

# 🧪 Funcionalidades para teste

Antes da entrega, as seguintes funcionalidades devem ser testadas:

* [ ] Cadastrar um exercício;
* [ ] Verificar se aparece na lista;
* [ ] Fechar o aplicativo;
* [ ] Abrir novamente;
* [ ] Verificar se os dados continuam salvos;
* [ ] Editar um exercício;
* [ ] Marcar um exercício como concluído;
* [ ] Alterar novamente para pendente;
* [ ] Excluir um exercício;
* [ ] Verificar se a lista foi atualizada.

---

# 🚧 Melhorias futuras

Possíveis funcionalidades para versões futuras:

* 📅 Histórico de treinos;
* 📊 Estatísticas de desempenho;
* 📈 Evolução de cargas;
* 🗓️ Calendário de treinos;
* 🔥 Sequência de dias treinados;
* 👤 Sistema de perfil;
* 🌙 Tema escuro;
* 🔔 Lembretes de treino;
* 🏆 Sistema de metas;
* 💪 Divisão de treinos por grupos musculares.

---

# 📸 Preview

> Em breve serão adicionadas imagens e capturas de tela da aplicação.

---

# 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

<p align="center">

### 🏋️ FitLog

**Organize seu treino. Acompanhe sua evolução.**

Desenvolvido por **Jonas Daniel de Brito Lopes** e **Vinicius Valle Rodrigues**.

</p>
