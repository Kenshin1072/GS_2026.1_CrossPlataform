import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { analyzeSystem, AlertType } from "@/services/aiPredictions";

interface MissionSettings {
  missionName: string;
  maxTemperature: number;
  minFuelLevel: number;
  maxFuelLevel: number;
}

interface SpaceContextType {
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;

  signalStrength: number;
  setSignalStrength: React.Dispatch<React.SetStateAction<number>>;

  fuelLevel: number;
  setFuelLevel: React.Dispatch<React.SetStateAction<number>>;

  alerts: AlertType[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>;

  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;

  missionSettings: MissionSettings;
  setMissionSettings: React.Dispatch<React.SetStateAction<MissionSettings>>;

  temperatureHistory: number[];
  setTemperatureHistory: React.Dispatch<React.SetStateAction<number[]>>;
}

export const SpaceContext = createContext({} as SpaceContextType);

export function SpaceProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [missionSettings, setMissionSettings] = useState<MissionSettings>({
    missionName: "Artemis-X",
    maxTemperature: 80,
    minFuelLevel: 20,
    maxFuelLevel: 80,
  });

  const [temperature, setTemperature] = useState<number>(
    missionSettings.maxTemperature,
  );
  const [signalStrength, setSignalStrength] = useState<number>(100);
  const [fuelLevel, setFuelLevel] = useState<number>(
    missionSettings.maxFuelLevel,
  );
  const alertedMessagesRef = useRef(new Set<string>());
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([
    72, 72, 72, 72, 72,
  ]);

  // Carrega as configurações salvas do AsyncStorage ao iniciar o app
  useEffect(() => {
    async function loadStorage() {
      try {
        const savedDarkMode = await AsyncStorage.getItem("darkMode");
        const savedAlerts = await AsyncStorage.getItem("alerts");
        const savedMissionSettings =
          await AsyncStorage.getItem("missionSettings");

        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }

        if (savedAlerts !== null) {
          setAlerts(JSON.parse(savedAlerts));
        }

        if (savedMissionSettings !== null) {
          setMissionSettings(JSON.parse(savedMissionSettings));
        }
      } catch (error) {
        console.log("Error loading storage", error);
      }
    }

    loadStorage();
  }, []);

  // Salva as configurações de modo escuro
  useEffect(() => {
    AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Salva os alertas gerados
  useEffect(() => {
    AsyncStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  // Salva as configurações da missão
  useEffect(() => {
    AsyncStorage.setItem("missionSettings", JSON.stringify(missionSettings));
  }, [missionSettings]);

  // Simulação de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => {
        const newTemp = prev + (Math.random() * 4 - 2);
        setTemperatureHistory((history) => [...history.slice(-4), newTemp]);
        return newTemp;
      });
      setFuelLevel((prev) => Math.max(0, prev - Math.random() * 1));
      setSignalStrength((prev) => Math.max(0, prev - Math.random() * 0.5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sistema de predição e alertas em tempo real
  useEffect(() => {
    const result = analyzeSystem({
      temperature,
      signalStrength,
      fuelLevel,

      maxTemperature: missionSettings.maxTemperature,

      minFuelLevel: missionSettings.minFuelLevel,
      maxFuelLevel: missionSettings.maxFuelLevel,
    });

    if (result && !alertedMessagesRef.current.has(result.message)) {
      alertedMessagesRef.current.add(result.message);

      setAlerts((prev) => [result, ...prev]);
    }
  }, [
    temperature,
    signalStrength,
    fuelLevel,
    missionSettings.maxTemperature,
    missionSettings.minFuelLevel,
    missionSettings.maxFuelLevel,
  ]);

  return (
    <SpaceContext.Provider
      value={{
        temperature,
        setTemperature,

        signalStrength,
        setSignalStrength,

        fuelLevel,
        setFuelLevel,

        alerts,
        setAlerts,

        darkMode,
        setDarkMode,

        missionSettings,
        setMissionSettings,

        temperatureHistory,
        setTemperatureHistory,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
}
