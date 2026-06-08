import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function TemperatureChart({ data }: { data: number[] }) {
  return (
    <View
      style={{
        backgroundColor: "#111827",
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        Temperatura
      </Text>

      <LineChart
        data={{
          labels: ["-20s", "-15s", "-10s", "-5s", "Now"],
          datasets: [
            {
              data,
            },
          ],
        }}
        width={screenWidth - 60}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundGradientFrom: "#111827",
          backgroundGradientTo: "#111827",
          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(56,189,248,${opacity})`,

          labelColor: () => "#f8fafc",
        }}
        bezier
      />
    </View>
  );
}
