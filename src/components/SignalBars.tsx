import { View, Text } from "react-native";

export default function SignalBars({
  signalStrength,
}: {
  signalStrength: number;
}) {
  const bars = [
    signalStrength > 20,
    signalStrength > 40,
    signalStrength > 60,
    signalStrength > 80,
  ];

  const signalColor =
    signalStrength > 70
      ? "#38bdf8"
      : signalStrength > 30
        ? "#facc15"
        : "#ef4444";

  return (
    <View
      style={{
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: signalColor,
          marginBottom: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Signal Strength
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 5,
          height: 100,
        }}
      >
        {[20, 40, 60, 80].map((height, index) => (
          <View
            key={index}
            style={{
              width: 15,
              height,
              borderRadius: 5,
              backgroundColor: bars[index] ? signalColor : "#334155",
            }}
          />
        ))}
      </View>

      <Text
        style={{
          color: "white",
          marginTop: 10,
        }}
      >
        {signalStrength.toFixed(0)}%
      </Text>
    </View>
  );
}
