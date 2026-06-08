import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SpaceContext } from "@/context/SpaceContext";
import { DarkTheme, LightTheme } from "@/hooks/colors";
import { analyzeSystem } from "@/services/aiPredictions";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Analysis() {
  const {
    darkMode,
    missionSettings,

    temperature,
    signalStrength,
    fuelLevel,

    alerts,
  } = useContext(SpaceContext);

  const theme = darkMode ? DarkTheme : LightTheme;

  const analysis = analyzeSystem({
    temperature,
    signalStrength,
    fuelLevel,

    maxTemperature: missionSettings.maxTemperature,
    minFuelLevel: missionSettings.minFuelLevel,
    maxFuelLevel: missionSettings.maxFuelLevel,
  });

  const currentPrediction = analyzeSystem({
    temperature,
    signalStrength,
    fuelLevel,

    maxTemperature: missionSettings.maxTemperature,

    minFuelLevel: missionSettings.minFuelLevel,
    maxFuelLevel: missionSettings.maxFuelLevel,
  });

  // Nível de risco baseado na pontuação de saúde
  const riskLevel =
    analysis.healthScore >= 80
      ? "BAIXO"
      : analysis.healthScore >= 50
        ? "MÉDIO"
        : "ALTO";

  const fuelPercentage = (fuelLevel / missionSettings.maxFuelLevel) * 100;
  const temperaturePercentage =
    (temperature / missionSettings.maxTemperature) * 100;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          AI Analysis
        </Text>

        {/* Previsão da IA em tempo real */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Previsão da IA em tempo real
          </Text>

          {currentPrediction ? (
            <>
              <Text
                style={{
                  color:
                    currentPrediction.risk === "ALTO"
                      ? theme.danger
                      : theme.primary,

                  fontWeight: "bold",
                }}
              >
                {" "}
                {analysis.risk} RISCO
              </Text>

              <Text
                style={{
                  color: theme.text,
                  marginTop: 10,
                }}
              >
                {analysis.message}
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: theme.text,
              }}
            >
              Totalmente estável. Nenhuma anomalia detectada.
            </Text>
          )}
        </View>

        {/* Informações da Missão */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,

              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Informações da Missão
          </Text>

          <Text
            style={{
              color: theme.text,
            }}
          >
            {missionSettings.missionName}
          </Text>
        </View>

        {/* Pontuação de Saúde */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,

              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Pontuação de Saúde
          </Text>

          <Text
            style={{
              color: theme.primary,
              fontSize: 36,
              fontWeight: "bold",
            }}
          >
            {analysis.healthScore}%
          </Text>
        </View>

        {/* Telemetria Atual */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,

              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Telemetria Atual
          </Text>

          <Text style={{ color: theme.text }}>
            Temperatura: {temperaturePercentage.toFixed(1)}°C
          </Text>

          <Text style={{ color: theme.text }}>
            Força do Sinal: {signalStrength.toFixed(0)}%
          </Text>

          <Text style={{ color: theme.text }}>
            Nível de Combustível: {fuelLevel.toFixed(0)} /{" "}
            {missionSettings.maxFuelLevel}
          </Text>

          <Text style={{ color: theme.text }}>
            Capacidade de Combustível: {fuelPercentage.toFixed(0)}%
          </Text>
        </View>

        {/* Recomendações da IA */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,

              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Recomendações da IA
          </Text>

          <Text
            style={{
              color: theme.text,
            }}
          >
            {analysis.recommendation}
          </Text>
        </View>

        {/* Alertas */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,

              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Alertas Recentes
          </Text>

          {alerts.length === 0 ? (
            <Text
              style={{
                color: theme.text,
              }}
            >
              Sem alertas recentes. Todos os sistemas estão operando
              normalmente.
            </Text>
          ) : (
            alerts.map((alert, index) => (
              <Text
                key={index}
                style={{
                  color: theme.text,
                  marginBottom: 8,
                }}
              >
                ⚠ {alert.message}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
