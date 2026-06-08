import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  fuelLevel: number;
  maxFuelLevel: number;
};

export default function FuelGauge({ fuelLevel, maxFuelLevel }: Props) {
  const radius = 60;
  const size = 150;

  const circumference = 2 * Math.PI * radius;

  const fuelPercentage = Math.max(
    0,
    Math.min(100, (fuelLevel / maxFuelLevel) * 100),
  );

  const strokeDashoffset =
    circumference - (fuelPercentage / 100) * circumference;

  const fuelColor =
    fuelPercentage > 60
      ? "#38bdf8"
      : fuelPercentage > 30
        ? "#facc15"
        : "#ef4444";

  return (
    <View
      style={{
        backgroundColor: "#111827",
        borderRadius: 20,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 220,
      }}
    >
      <Text
        style={{
          color: fuelColor,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Combustível
      </Text>

      <View
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={size}
          height={size}
          style={{
            position: "absolute",
          }}
        >
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={fuelColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2},${size / 2}`}
          />
        </Svg>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            {fuelPercentage.toFixed(0)}%
          </Text>

          <Text
            style={{
              color: fuelColor,
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {fuelPercentage > 60
              ? "Nível Seguro"
              : fuelPercentage > 30
                ? "Atenção"
                : "Crítico"}
          </Text>
        </View>
      </View>
    </View>
  );
}
