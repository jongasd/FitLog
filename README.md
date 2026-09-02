# FitLog

App mobile/web feito com Expo para registrar treinos de academia: cadastrar, marcar como concluído, editar e excluir. Os dados ficam salvos localmente no dispositivo (AsyncStorage) — não há backend nem persistência em nuvem.

## Stack

- [Expo](https://expo.dev) 57 + Expo Router (roteamento por arquivos)
- React Native 0.86 / React 19
- Javascript
- `@react-native-async-storage/async-storage` para persistência local

## Funcionalidades

- Listagem de treinos com status (Concluído / Pendente)
- Criar novo treino (nome + descrição)
- Editar treino existente
- Marcar/desmarcar como concluído
- Excluir treino (com confirmação)

## Como rodar

```bash
npm install
npx expo start
```

No terminal do Expo, escolha como abrir o app:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- Emulador Android
- Simulador iOS
- [Expo Go](https://expo.dev/go)
- Navegador (`w` para abrir a versão web)

## Estrutura

```
src/
  app/
    index.tsx      # tela principal — lista de treinos
    explore.tsx     # formulário de criar/editar treino
  services/
    storage.js       # leitura/escrita no AsyncStorage
  components/         # componentes de UI compartilhados
```

## Nota sobre `database.sql`

O arquivo `database.sql` na raiz define tabelas MySQL (`maquinas`, `exercicio`) que **não são usadas em nenhum lugar do código atual**. O app persiste tudo localmente via AsyncStorage, sem nenhuma chamada a um backend/API. Se a ideia é migrar para esse schema (treino por máquina/grupo muscular, séries, repetições, PR), isso ainda precisa ser implementado — hoje é só um arquivo solto, não reflete o estado real do app.

## Integrantes
-Jonas Daniel de Brito Lopes
-Vinícius Valle Rodrigues

## Licença

Ver [LICENSE](./LICENSE).
