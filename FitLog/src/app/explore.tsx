import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";
import {
  buscarTreinos,
  salvarTreinos,
} from "../services/storage";

type Treino = {
  id: string;
  nome: string;
  descricao: string;
  concluido: boolean;
};

export default function Explore() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    carregarTreino();
  }, [id]);

  async function carregarTreino() {
    if (!id) {
      setEditando(false);
      return;
    }

    try {
      const treinos: Treino[] = await buscarTreinos();

      const treino = treinos.find(
        (item) => item.id === id
      );

      if (treino) {
        setNome(treino.nome);
        setDescricao(treino.descricao);
        setEditando(true);
      }
    } catch (error) {
      console.log("Erro ao carregar treino:", error);
    }
  }

  async function salvarTreino() {
    if (!nome.trim()) {
      Alert.alert(
        "Atenção",
        "Digite o nome do treino."
      );

      return;
    }

    try {
      const treinos: Treino[] = await buscarTreinos();

      if (editando && id) {
        const novosTreinos = treinos.map(
          (treino) =>
            treino.id === id
              ? {
                  ...treino,
                  nome: nome.trim(),
                  descricao: descricao.trim(),
                }
              : treino
        );

        await salvarTreinos(novosTreinos);
      } else {
        const novoTreino: Treino = {
          id: Date.now().toString(),
          nome: nome.trim(),
          descricao: descricao.trim(),
          concluido: false,
        };

        await salvarTreinos([
          ...treinos,
          novoTreino,
        ]);
      }

      router.back();
    } catch (error) {
      console.log("Erro ao salvar treino:", error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar o treino."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editando ? "Editar treino" : "Novo treino"}
      </Text>

      <Text style={styles.label}>
        Nome do treino
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Treino de peito"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva seu treino"
        placeholderTextColor="#999"
        multiline
        numberOfLines={5}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarTreino}
      >
        <Text style={styles.saveText}>
          {editando
            ? "Salvar alterações"
            : "Salvar treino"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#111111",
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#111111",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 5,
  },

  cancelText: {
    color: "#555555",
    fontSize: 15,
  },
});