import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "@fitlog_treinos";

export async function buscarTreinos() {
  const dados = await AsyncStorage.getItem(CHAVE);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

export async function salvarTreinos(treinos) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
}