import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { SpaceContext } from "@/context/SpaceContext";
import { useMemo } from "react";

import AlertCard from "@/components/AlertCard";
import SignalBars from "@/components/SignalBars";
import FuelGauge from "@/components/FuelGauge";
import RadarDisplay from "@/components/RadarDisplay";
import TemperatureChart from "@/components/TemperatureChart";
import { DarkTheme, LightTheme } from "@/hooks/colors";

export default function HomeScreen() {
  const {
    alerts,
    darkMode,
    signalStrength,
    fuelLevel,
    temperatureHistory,
    missionSettings,
  } = useContext(SpaceContext);
  const theme = darkMode ? DarkTheme : LightTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const fuelPercentage = (fuelLevel / missionSettings.maxFuelLevel) * 100;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title]}>OrbitalMind</Text>

        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <SignalBars signalStrength={signalStrength} />
          </View>

          <View style={{ flex: 1 }}>
            <FuelGauge
              fuelLevel={fuelLevel}
              maxFuelLevel={missionSettings.maxFuelLevel}
            />
          </View>
        </View>

        <RadarDisplay />

        <TemperatureChart data={temperatureHistory} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },

    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },
  });
