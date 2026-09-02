import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@fitlog:treinos";

export async function buscarTreinosStorage() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STORAGE);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    return [];
  }
}

export async function salvarTreinosStorage(treinos) {
  try {
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(treinos));
  } catch (error) {
    console.error("Erro ao salvar treinos:", error);

    throw new Error("Não foi possível salvar os treinos.");
  }
}
