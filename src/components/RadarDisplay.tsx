import { View, Text } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

export default function RadarDisplay() {
  const targets = [
    { x: 150, y: 60 },
    { x: 80, y: 120 },
    { x: 170, y: 150 },
  ];
  return (
    <View
      style={{
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        Orbital Radar
      </Text>

      <Svg width="220" height="220">
        {[90, 60, 30].map((radius) => (
          <Circle
            key={radius}
            cx="110"
            cy="110"
            r={radius}
            stroke="#38bdf8"
            strokeWidth="2"
            fill="none"
          />
        ))}
        {targets.map((target, index) => (
          <Circle
            key={index}
            cx={target.x}
            cy={target.y}
            r="5"
            fill="#22c55e"
          />
        ))}
        <Line
          x1="110"
          y1="110"
          x2={targets[0].x}
          y2={targets[0].y}
          stroke="#38bdf8"
          strokeWidth="2"
        />

        <Circle cx="110" cy="110" r="6" fill="#38bdf8" />
      </Svg>
    </View>
  );
}
