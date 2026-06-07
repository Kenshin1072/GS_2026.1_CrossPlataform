import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SpaceContext } from "@/context/SpaceContext";
import { DarkTheme, LightTheme } from "@/hooks/colors";
import {
  calculateMissionHealth,
  generateRecommendation,
  analyzeSystem,
} from "@/services/aiPredictions";
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

  // Mission Health Score
  const healthScore = calculateMissionHealth(
    temperature,
    signalStrength,
    fuelLevel,
  );

  const currentPrediction = analyzeSystem({
    temperature,
    signalStrength,
    fuelLevel,

    maxTemperature: missionSettings.maxTemperature,

    minFuelLevel: missionSettings.minFuelLevel,
  });

  // Risk Level
  const riskLevel =
    healthScore >= 80 ? "LOW" : healthScore >= 50 ? "MEDIUM" : "HIGH";

  // AI Recommendation
  const recommendation = generateRecommendation(
    temperature,
    signalStrength,
    fuelLevel,
  );

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

        {/* Live AI Prediction */}

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
            Live AI Prediction
          </Text>

          {currentPrediction ? (
            <>
              <Text
                style={{
                  color:
                    currentPrediction.risk === "HIGH"
                      ? theme.danger
                      : theme.primary,

                  fontWeight: "bold",
                }}
              >
                {" "}
                {currentPrediction.risk} RISK
              </Text>

              <Text
                style={{
                  color: theme.text,
                  marginTop: 10,
                }}
              >
                {currentPrediction.message}
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: theme.text,
              }}
            >
              All systems nominal.
            </Text>
          )}
        </View>

        {/* Mission Info */}

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
            Mission
          </Text>

          <Text
            style={{
              color: theme.text,
            }}
          >
            {missionSettings.missionName}
          </Text>
        </View>

        {/* Health Score */}

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
            Mission Health
          </Text>

          <Text
            style={{
              color: theme.primary,
              fontSize: 36,
              fontWeight: "bold",
            }}
          >
            {healthScore}%
          </Text>
        </View>

        {/* Risk Level */}

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
            Risk Assessment
          </Text>

          <Text
            style={{
              color: riskLevel === "HIGH" ? theme.danger : theme.primary,

              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {riskLevel}
          </Text>
        </View>

        {/* Current Telemetry */}

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
            Current Telemetry
          </Text>

          <Text style={{ color: theme.text }}>
            Temperature: {temperature.toFixed(1)}°C
          </Text>

          <Text style={{ color: theme.text }}>
            Signal Strength: {signalStrength.toFixed(0)}%
          </Text>

          <Text style={{ color: theme.text }}>
            Fuel Level: {fuelLevel.toFixed(0)}%
          </Text>
        </View>

        {/* AI Recommendation */}

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
            AI Recommendation
          </Text>

          <Text
            style={{
              color: theme.text,
            }}
          >
            {recommendation}
          </Text>
        </View>

        {/* Alerts */}

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
            Recent Alerts
          </Text>

          {alerts.length === 0 ? (
            <Text
              style={{
                color: theme.text,
              }}
            >
              No alerts detected.
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
