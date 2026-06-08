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

  const signalStatus =
    signalStrength > 70
      ? "ESTÁVEL"
      : signalStrength > 30
        ? "INSTÁVEL"
        : "CRÍTICO";

  return (
    <View
      style={{
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        height: 220,
        justifyContent: "space-between",
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
        Força do Sinal
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 6,
          height: 80,
        }}
      >
        {[20, 40, 60, 80].map((height, index) => {
          const active = bars[index];

          return (
            <View
              key={index}
              style={{
                width: 18,
                height,
                borderRadius: 5,

                backgroundColor: active ? signalColor : "#334155",

                ...(active && {
                  shadowColor: signalColor,
                  shadowRadius: 8,
                  shadowOpacity: 0.8,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },

                  elevation: 8,
                }),

                ...(index === 3 &&
                  active && {
                    shadowColor: signalColor,
                    shadowRadius: 15,
                  }),
              }}
            />
          );
        })}
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {signalStrength.toFixed(0)}%
        </Text>

        <Text
          style={{
            color: signalColor,
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 4,
          }}
        >
          {signalStatus}
        </Text>
      </View>
    </View>
  );
}
