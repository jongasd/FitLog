import { router, useFocusEffect } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCallback, useState } from "react";
import { buscarTreinos, salvarTreinos } from "../services/storage";

type Treino = {
  id: string;
  nome: string;
  descricao: string;
  concluido: boolean;
};

export default function Home() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarTreinos() {
    try {
      const dados = await buscarTreinos();

      if (dados.length === 0) {
        const treinosIniciais: Treino[] = [
          {
            id: "1",
            nome: "Treino de Peito",
            descricao: "Supino, crucifixo e flexão",
            concluido: false,
          },
          {
            id: "2",
            nome: "Treino de Pernas",
            descricao: "Agachamento, leg press e extensora",
            concluido: true,
          },
        ];

        await salvarTreinos(treinosIniciais);
        setTreinos(treinosIniciais);
      } else {
        setTreinos(dados);
      }
    } catch (error) {
      console.log("Erro ao carregar treinos:", error);
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarTreinos();
    }, [])
  );

  async function concluirTreino(id: string) {
    const novosTreinos = treinos.map((treino) =>
      treino.id === id
        ? { ...treino, concluido: !treino.concluido }
        : treino
    );

    setTreinos(novosTreinos);
    await salvarTreinos(novosTreinos);
  }

  function excluirTreino(id: string) {
    Alert.alert(
      "Excluir treino",
      "Tem certeza que deseja excluir este treino?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const novosTreinos = treinos.filter(
              (treino) => treino.id !== id
            );

            setTreinos(novosTreinos);
            await salvarTreinos(novosTreinos);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>FitLog</Text>

        <Text style={styles.subtitle}>
          Seus treinos em um só lugar
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Meus treinos</Text>

        {carregando ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={treinos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.empty}>
                Nenhum treino cadastrado.
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.nome}>{item.nome}</Text>

                  <View
                    style={[
                      styles.status,
                      item.concluido
                        ? styles.statusConcluido
                        : styles.statusPendente,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {item.concluido
                        ? "Concluído"
                        : "Pendente"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.descricao}>
                  {item.descricao}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => concluirTreino(item.id)}
                  >
                    <Text style={styles.buttonText}>
                      {item.concluido
                        ? "Desmarcar"
                        : "Concluir"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      router.push({
                        pathname: "/explore",
                        params: {
                          id: item.id,
                        },
                      })
                    }
                  >
                    <Text style={styles.buttonText}>
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => excluirTreino(item.id)}
                  >
                    <Text style={styles.deleteText}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.addButtonText}>
            + Novo treino
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    backgroundColor: "#111111",
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },

  logo: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaaaaa",
    fontSize: 14,
    marginTop: 5,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111111",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
    flex: 1,
  },

  descricao: {
    color: "#666666",
    marginTop: 8,
    marginBottom: 15,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusConcluido: {
    backgroundColor: "#dff5e5",
  },

  statusPendente: {
    backgroundColor: "#eeeeee",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  button: {
    backgroundColor: "#111111",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: "#555555",
    fontSize: 12,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#111111",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    color: "#777777",
    marginTop: 30,
  },
});