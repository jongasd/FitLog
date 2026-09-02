import { buscarTreinosStorage, salvarTreinosStorage } from "./storage";

import { validarTreino } from "../utils/treinoValidator";

// CREATE
export async function criarTreino(dados) {
  const erro = validarTreino(dados);

  if (erro) {
    throw new Error(erro);
  }

  const treinos = await buscarTreinosStorage();

  const novoTreino = {
    id: Date.now().toString(),
    nome: dados.nome.trim(),
    descricao: dados.descricao.trim(),
    concluido: false,
    criadoEm: new Date().toISOString(),
  };

  treinos.push(novoTreino);

  await salvarTreinosStorage(treinos);

  return novoTreino;
}

// READ
export async function listarTreinos() {
  const treinos = await buscarTreinosStorage();

  return treinos;
}

// READ POR ID
export async function buscarTreinoPorId(id) {
  const treinos = await buscarTreinosStorage();

  const treino = treinos.find((item) => item.id === id);

  if (!treino) {
    throw new Error("Treino não encontrado.");
  }

  return treino;
}

// UPDATE
export async function atualizarTreino(id, dadosAtualizados) {
  const erro = validarTreino(dadosAtualizados);

  if (erro) {
    throw new Error(erro);
  }

  const treinos = await buscarTreinosStorage();

  const treinoExiste = treinos.some((treino) => treino.id === id);

  if (!treinoExiste) {
    throw new Error("Treino não encontrado.");
  }

  const novaLista = treinos.map((treino) => {
    if (treino.id === id) {
      return {
        ...treino,
        nome: dadosAtualizados.nome.trim(),
        descricao: dadosAtualizados.descricao.trim(),
        atualizadoEm: new Date().toISOString(),
      };
    }

    return treino;
  });

  await salvarTreinosStorage(novaLista);

  return novaLista;
}

// UPDATE STATUS
export async function alterarStatusTreino(id) {
  const treinos = await buscarTreinosStorage();

  const treinoExiste = treinos.some((treino) => treino.id === id);

  if (!treinoExiste) {
    throw new Error("Treino não encontrado.");
  }

  const novaLista = treinos.map((treino) => {
    if (treino.id === id) {
      return {
        ...treino,
        concluido: !treino.concluido,
        atualizadoEm: new Date().toISOString(),
      };
    }

    return treino;
  });

  await salvarTreinosStorage(novaLista);

  return novaLista;
}

// DELETE
export async function excluirTreino(id) {
  const treinos = await buscarTreinosStorage();

  const treinoExiste = treinos.some((treino) => treino.id === id);

  if (!treinoExiste) {
    throw new Error("Treino não encontrado.");
  }

  const novaLista = treinos.filter((treino) => treino.id !== id);

  await salvarTreinosStorage(novaLista);

  return novaLista;
}
