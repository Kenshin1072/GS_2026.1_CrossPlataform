import { useContext, useState } from "react";
import { Text, TextInput, Switch } from "react-native";
import { SpaceContext } from "@/context/SpaceContext";
import { LightTheme, DarkTheme } from "@/hooks/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Mission() {
  const {
    darkMode,
    setDarkMode,

    missionSettings,
    setMissionSettings,

    fuelLevel,
    setFuelLevel,
  } = useContext(SpaceContext);

  const theme = darkMode ? DarkTheme : LightTheme;

  const [missionNameError, setMissionNameError] = useState("");
  const [maxTempError, setMaxTempError] = useState("");
  const [minFuelError, setMinFuelError] = useState("");
  const [maxFuelError, setMaxFuelError] = useState("");

  // Validação para o nome da missão
  function validateMissionName() {
    const name = missionSettings.missionName.trim();
    if (name.length < 3) {
      setMissionNameError("Nome da missão deve ter pelo menos 3 caracteres.");
    } else {
      setMissionNameError("");
    }

    if (name.length > 30) {
      setMissionNameError("Nome da missão não pode exceder 30 caracteres.");
      return;
    }
    setMissionNameError("");
  }

  // Validações para os campos numéricos de temperatura máxima e nível mínimo de combustível
  function validateMaxTemperature() {
    const temp = missionSettings.maxTemperature;

    if (isNaN(temp) || temp < 50 || temp > 500) {
      setMaxTempError("Temmperatura máxima deve ser um número entre 50 e 500.");
      return;
    }
    setMaxTempError("");
  }
  function validateMinFuelLevel() {
    const fuel = missionSettings.minFuelLevel;

    if (isNaN(fuel) || fuel < 0 || fuel > 100) {
      setMinFuelError(
        "Nível mínimo de combustível deve ser um número entre 0 e 100.",
      );
      return;
    }
    setMinFuelError("");
  }
  function validateMaxFuelLevel() {
    const fuel = missionSettings.maxFuelLevel;

    if (isNaN(fuel) || fuel < 100 || fuel > 500) {
      setMaxFuelError(
        "Nível máximo de combustível deve ser um número entre 100 e 500.",
      );
      return;
    }
    setMaxFuelError("");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 26,
          marginBottom: 20,
        }}
      >
        Configurações da Missão
      </Text>

      {/* Nome da Missão */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Nome da Missão
      </Text>

      <TextInput
        value={missionSettings.missionName}
        onChangeText={(text) =>
          setMissionSettings((prev) => ({
            ...prev,
            missionName: text,
          }))
        }
        onBlur={validateMissionName}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      {missionNameError && (
        <Text style={{ color: theme.danger, marginBottom: 20 }}>
          {missionNameError}
        </Text>
      )}

      {/* Temperatura Máxima */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Temperatura Máxima
      </Text>

      <TextInput
        keyboardType="numeric"
        value={missionSettings.maxTemperature.toString()}
        onChangeText={(text) =>
          setMissionSettings((prev) => ({
            ...prev,
            maxTemperature: Number(text) || 0,
          }))
        }
        onBlur={validateMaxTemperature}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      {maxTempError && (
        <Text style={{ color: theme.danger, marginBottom: 20 }}>
          {maxTempError}
        </Text>
      )}

      {/* Nível Mínimo de Combustível */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Nível Mínimo de Combustível
      </Text>

      <TextInput
        keyboardType="numeric"
        value={missionSettings.minFuelLevel.toString()}
        onChangeText={(text) =>
          setMissionSettings((prev) => ({
            ...prev,
            minFuelLevel: Number(text) || 0,
          }))
        }
        onBlur={validateMinFuelLevel}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      {minFuelError && (
        <Text style={{ color: theme.danger, marginBottom: 20 }}>
          {minFuelError}
        </Text>
      )}

      {/* Nível Máximo de Combustível */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Nível Máximo de Combustível
      </Text>

      <TextInput
        keyboardType="numeric"
        value={missionSettings.maxFuelLevel.toString()}
        onBlur={validateMaxFuelLevel}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
        onChangeText={(text) => {
          const newMaxFuel = Number(text) || 0;
          setMissionSettings((prev) => ({
            ...prev,
            maxFuelLevel: newMaxFuel,
          }));

          setFuelLevel(newMaxFuel);
        }}
      />
      {maxFuelError && (
        <Text style={{ color: theme.danger, marginBottom: 20 }}>
          {maxFuelError}
        </Text>
      )}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Modo Escuro
      </Text>

      <Switch value={darkMode} onValueChange={setDarkMode} />
    </SafeAreaView>
  );
}
