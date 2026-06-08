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

export interface AnalysisResult {
  risk: "BAIXO" | "MÉDIO" | "ALTO";
  message: string;
  healthScore: number;
  recommendation: string;
}

export function analyzeSystem({
  temperature,
  signalStrength,
  fuelLevel,
  maxTemperature,
  minFuelLevel,
  maxFuelLevel,
}: SystemStatus): AnalysisResult {
  const temperaturePercentage = (temperature / maxTemperature) * 100;

  const fuelPercentage = (fuelLevel / maxFuelLevel) * 100;

  let healthScore = 100;

  healthScore -= Math.max(0, temperaturePercentage - 70);

  healthScore -= (100 - signalStrength) * 0.5;

  healthScore -= (100 - fuelPercentage) * 0.3;

  healthScore = Math.max(0, Math.round(healthScore));

  // PRIORIDADE MÁXIMA

  if (signalStrength < 40) {
    return {
      risk: "ALTO",
      healthScore,

      message: "Falha na sinalização prevista",

      recommendation:
        "Reduza imediatamente a carga térmica e estabilize as comunicações.",
    };
  }

  if (fuelLevel <= minFuelLevel) {
    return {
      risk: "ALTO",
      healthScore,

      message: "Nível crítico de combustível previsto",

      recommendation:
        "Ative protocolos emergenciais de economia de combustível.",
    };
  }

  if (signalStrength < 30) {
    return {
      risk: "ALTO",
      healthScore,

      message: "Instabilidade severa na comunicação detectada",

      recommendation: "Redirecione antenas e priorize sistemas de comunicação.",
    };
  }

  // PRIORIDADE MÉDIA

  if (fuelPercentage <= 30) {
    return {
      risk: "MÉDIO",
      healthScore,

      message: "Nível de combustível baixo detectado",

      recommendation: "Preparar protocolo de economia de combustível.",
    };
  }

  if (temperaturePercentage >= 80) {
    return {
      risk: "MÉDIO",
      healthScore,

      message: "Temperatura aproximando-se do limite operacional",

      recommendation: "Ativar sistemas auxiliares de resfriamento.",
    };
  }

  if (temperature >= maxTemperature) {
    return {
      risk: "ALTO",
      healthScore,
      message: "Temperatura excedeu o limite operacional",
      recommendation:
        "Ativar protocolos de emergência para resfriamento imediato.",
    };
  }

  // ESTÁVEL

  return {
    risk: "BAIXO",
    healthScore,

    message: "Todos os sistemas operando normalmente",

    recommendation: "Continuar monitoramento padrão da missão.",
  };
}
