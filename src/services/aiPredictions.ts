export interface SystemStatus {
  temperature: number;
  signalStrength: number;
  fuelLevel: number;

  maxTemperature: number;
  minFuelLevel: number;
}

export interface AlertType {
  risk: "LOW" | "MEDIUM" | "HIGH";
  message: string;
}

export function analyzeSystem({
  temperature,
  signalStrength,
  fuelLevel,
  maxTemperature,
  minFuelLevel,
}: SystemStatus): AlertType | null {
  if (temperature > maxTemperature && signalStrength < 40) {
    return {
      risk: "HIGH",
      message: "Predicted signal failure due to overheating",
    };
  }

  if (fuelLevel < minFuelLevel) {
    return {
      risk: "MEDIUM",
      message: "Critical fuel level predicted",
    };
  }

  if (signalStrength < 30) {
    return {
      risk: "HIGH",
      message: "Severe communication instability detected",
    };
  }

  if (temperature > 75) {
    return {
      risk: "LOW",
      message: "Thermal fluctuation detected",
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
    return "Prepare fuel conservation protocol.";
  }

  if (signalStrength < 40) {
    return "Monitor communication systems.";
  }

  if (temperature > 75) {
    return "Activate thermal regulation.";
  }

  return "All systems operating normally.";
}
