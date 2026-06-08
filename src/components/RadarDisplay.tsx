import { View, Text } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { useEffect, useState } from "react";

export default function RadarDisplay() {
  const [angle, setAngle] = useState(0);
  const [blink, setBlink] = useState(true);
  const targets = [
    { x: 150, y: 60, distance: 152 },
    { x: 80, y: 120, distance: 317 },
    { x: 170, y: 150, distance: 89 },
  ];

  const centerX = 110;
  const centerY = 110;
  const radarRadius = 90;

  const sweepX = centerX + radarRadius * Math.cos((angle * Math.PI) / 180);
  const sweepY = centerY + radarRadius * Math.sin((angle * Math.PI) / 180);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#111827",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
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
        Radar Orbital
      </Text>

      <Svg width="220" height="220">
        {[90, 60, 30].map((radius) => (
          <Circle
            key={radius}
            cx="110"
            cy="110"
            r={radius}
            stroke="#38bdf8"
            strokeWidth="1"
            fill="none"
            opacity={0.5}
          />
        ))}

        <Line
          x1="20"
          y1="110"
          x2="200"
          y2="110"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity={0.4}
        />

        <Line
          x1="110"
          y1="20"
          x2="110"
          y2="200"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity={0.4}
        />

        <Line
          x1={centerX}
          y1={centerY}
          x2={sweepX}
          y2={sweepY}
          stroke="#22c55e"
          strokeWidth="2"
        />
        {targets.map((target, index) => (
          <Circle
            key={index}
            cx={target.x}
            cy={target.y}
            r="5"
            fill="#22c55e"
            opacity={blink ? 1 : 0.3}
          />
        ))}

        <Circle cx="110" cy="110" r="6" fill="#38bdf8" />
      </Svg>
      <View
        style={{
          marginTop: 8,
          width: "100%",
        }}
      >
        {targets.map((target, index) => (
          <Text
            key={index}
            style={{
              color: "#94a3b8",
              fontSize: 12,
            }}
          >
            Alvo {String.fromCharCode(65 + index)} • {target.distance} km
          </Text>
        ))}
      </View>
    </View>
  );
}
