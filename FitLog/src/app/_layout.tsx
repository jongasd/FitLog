import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "FitLog",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="explore"
        options={{
          title: "Novo treino",
        }}
      />
    </Stack>
  );
}