import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useContext } from "react";
import { SpaceContext } from "@/context/SpaceContext";

const screenWidth = Dimensions.get("window").width;

export default function TemperatureChart({ data }: { data: number[] }) {
  const { missionSettings } = useContext(SpaceContext);

  const criticalTemperature = missionSettings.maxTemperature * 0.8;
  const warningTemperature = missionSettings.maxTemperature;

  const warningLine = data.map(() => warningTemperature);
  const criticalLine = data.map(() => criticalTemperature);

  const currentTemperature = data[data.length - 1];

  return (
    <View
      style={{
        backgroundColor: "#111827",
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Temperatura
      </Text>

      <Text
        style={{
          color: "#38bdf8",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        {currentTemperature.toFixed(1)}°C
      </Text>

      <LineChart
        data={{
          labels: ["-20s", "-15s", "-10s", "-5s", "Now"],

          datasets: [
            {
              data,
              color: () => "#38bdf8",
              strokeWidth: 3,
            },

            {
              data: warningLine,
              color: () => "#facc15",
              strokeWidth: 2,
            },

            {
              data: criticalLine,
              color: () => "#ef4444",
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 70}
        height={220}
        yAxisSuffix="°C"
        bezier
        withDots
        withInnerLines
        withOuterLines
        chartConfig={{
          backgroundGradientFrom: "#111827",
          backgroundGradientTo: "#111827",

          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(56,189,248,${opacity})`,

          labelColor: () => "#f8fafc",

          fillShadowGradient: "#38bdf8",
          fillShadowGradientOpacity: 0.25,

          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#38bdf8",
          },

          propsForBackgroundLines: {
            stroke: "#334155",
            strokeDasharray: "",
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "#38bdf8",
            fontWeight: "bold",
          }}
        >
          ● Atual
        </Text>

        <Text
          style={{
            color: "#facc15",
            fontWeight: "bold",
          }}
        >
          ● Atenção ({criticalTemperature.toFixed(0)} °C)
        </Text>

        <Text
          style={{
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          ● Crítico ({warningTemperature.toFixed(0)} °C)
        </Text>
      </View>
    </View>
  );
}
