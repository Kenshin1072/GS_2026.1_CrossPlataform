export interface SystemStatus {
  temperature: number;
  signalStrength: number;
  fuelLevel: number;

  maxTemperature: number;
  minFuelLevel: number;
  maxFuelLevel: number;
}

export interface AlertType {
  risk: "BAIXO" | "MÉDIO" | "ALTO";
  message: string;
}

export function analyzeSystem({
  temperature,
  signalStrength,
  fuelLevel,
  maxTemperature,
  minFuelLevel,
  maxFuelLevel,
}: SystemStatus): AlertType | null {
  const temperaturePercentage = (temperature / maxTemperature) * 100;
  const fuelPercentage = (fuelLevel / maxFuelLevel) * 100;

  if (temperaturePercentage >= 90 && signalStrength < 40) {
    return {
      risk: "ALTO",
      message: "Falha na sinalização prevista devido ao superaquecimento",
    };
  }

  if (fuelPercentage <= 30) {
    return {
      risk: "MÉDIO",
      message:
        "Nível de combustível baixo, prepare para economia de combustível",
    };
  }

  if (fuelLevel <= minFuelLevel) {
    return {
      risk: "ALTO",
      message: "Nível crítico de combustível previsto",
    };
  }

  if (signalStrength < 30) {
    return {
      risk: "ALTO",
      message: "Instabilidade severa na comunicação detectada",
    };
  }

  if (temperaturePercentage >= 80) {
    return {
      risk: "BAIXO",
      message: "Flutuação térmica detectada",
    };
  }

  return null;
}

export function calculateMissionHealth(
  temperature: number,
  signalStrength: number,
  fuelLevel: number,
) {
  let score = 100;

  score -= Math.max(0, temperature - 70);

  score -= (100 - signalStrength) * 0.5;

  score -= (100 - fuelLevel) * 0.3;

  return Math.max(0, Math.round(score));
}

export function generateRecommendation(
  temperature: number,
  signalStrength: number,
  fuelLevel: number,
) {
  if (fuelLevel < 30) {
    return "Prepare o protocolo de economia de combustível.";
  }

  if (signalStrength < 40) {
    return "Monitorar sistemas de comunicação.";
  }

  if (temperature > 75) {
    return "Ativar sistemas de resfriamento adicionais.";
  }

  return "Todos os sistemas operando dentro dos parâmetros normais.";
}
