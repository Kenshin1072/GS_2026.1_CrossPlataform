import { View, Text } from "react-native";

export default function AlertCard({
  alert,
}: {
  alert: { risk: string; message: string };
}) {
  return (
    <View
      style={{
        backgroundColor: "#7f1d1d",
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        {alert.risk} RISCO
      </Text>

      <Text style={{ color: "white" }}>{alert.message}</Text>
    </View>
  );
}
