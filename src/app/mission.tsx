import { useContext, useState } from "react";
import { Text, TextInput, Switch, SafeAreaView } from "react-native";
import { SpaceContext } from "@/context/SpaceContext";
import { LightTheme, DarkTheme } from "@/hooks/colors";

export default function Mission() {
  const {
    darkMode,
    setDarkMode,

    missionSettings,
    setMissionSettings,
  } = useContext(SpaceContext);

  const theme = darkMode ? DarkTheme : LightTheme;

  const [missionNameError, setMissionNameError] = useState("");
  const [maxTempError, setMaxTempError] = useState("");
  const [minFuelError, setMinFuelError] = useState("");

  function validateMissionName() {
    const name = missionSettings.missionName.trim();
    if (name.length < 3) {
      setMissionNameError("Mission name must be at least 3 characters long.");
    } else {
      setMissionNameError("");
    }

    if (name.length > 30) {
      setMissionNameError("Mission name cannot exceed 30 characters.");
      return;
    }
    setMissionNameError("");
  }

  function validateMaxTemperature() {
    const temp = missionSettings.maxTemperature;

    if (isNaN(temp) || temp < 50 || temp > 500) {
      setMaxTempError("Max temperature must be a number between 50 and 500.");
      return;
    }
    setMaxTempError("");
  }

  function validateMinFuelLevel() {
    const fuel = missionSettings.minFuelLevel;

    if (isNaN(fuel) || fuel < 0 || fuel > 100) {
      setMinFuelError("Min fuel level must be a number between 0 and 100.");
      return;
    }
    setMinFuelError("");
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
        Mission Settings
      </Text>

      {/* Mission Name Input */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Mission Name
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

      {/* Max Temperature Input */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Max Temperature
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

      {/* Min Fuel Level Input */}

      <Text
        style={{
          color: theme.text,
        }}
      >
        Min Fuel Level
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

      <Text
        style={{
          color: theme.text,
        }}
      >
        Dark Mode
      </Text>

      <Switch value={darkMode} onValueChange={setDarkMode} />
    </SafeAreaView>
  );
}
