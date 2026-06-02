import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function FuelGauge({ fuelLevel }: { fuelLevel: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (fuelLevel / 100) * circumference;
  const fuelColor =
    fuelLevel > 60 ? "#38bdf8" : fuelLevel > 30 ? "#facc15" : "#ef4444";

  return (
    <View
      style={{
        backgroundColor: "#111827",
        padding: 100,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: fuelColor,
          fontSize: 18,
          marginBottom: 20,
          marginTop: -70,
          fontWeight: "bold",
        }}
      >
        Fuel Level
      </Text>

      <Svg width="200" height="200">
        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="15"
        />

        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={fuelColor}
          strokeWidth="15"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="100,100"
        />
      </Svg>

      <Text
        style={{
          color: "white",
          fontSize: 24,
          marginTop: -120,
          fontWeight: "bold",
        }}
      >
        {fuelLevel.toFixed(0)}%
      </Text>
    </View>
  );
}
