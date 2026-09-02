export function validarTreino(dados) {
  if (!dados.nome || !dados.nome.trim()) {
    return "O nome do treino é obrigatório.";
  }

  if (dados.nome.trim().length < 3) {
    return "O nome deve possuir pelo menos 3 caracteres.";
  }

  if (!dados.descricao || !dados.descricao.trim()) {
    return "A descrição do treino é obrigatória.";
  }

  if (dados.descricao.trim().length < 5) {
    return "A descrição deve possuir pelo menos 5 caracteres.";
  }

  return null;
}
