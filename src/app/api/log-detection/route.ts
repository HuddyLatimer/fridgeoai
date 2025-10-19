import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "detection-logs");
const LOG_FILE = path.join(LOG_DIR, "detections.jsonl");

export async function POST(request: NextRequest) {
  try {
    const { detectedIngredients, userCorrections, storageType, timestamp } = await request.json();

    // Ensure log directory exists
    if (!existsSync(LOG_DIR)) {
      await mkdir(LOG_DIR, { recursive: true });
    }

    // Create log entry
    const logEntry = {
      timestamp: timestamp || new Date().toISOString(),
      storageType,
      detectedIngredients,
      userCorrections,
      accuracy: calculateAccuracy(detectedIngredients, userCorrections),
    };

    // Append to log file (JSONL format - one JSON object per line)
    await writeFile(LOG_FILE, JSON.stringify(logEntry) + "\n", { flag: "a" });

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error("Error logging detection:", error);
    return NextResponse.json(
      { error: "Failed to log detection data" },
      { status: 500 }
    );
  }
}

// Calculate how accurate the detection was
function calculateAccuracy(detected: any[], corrected: any[]) {
  if (!detected || !corrected) return null;

  const detectedNames = detected.map(i => i.name.toLowerCase().trim());
  const correctedNames = corrected.map(i => i.name.toLowerCase().trim());

  const correctDetections = detectedNames.filter(name =>
    correctedNames.includes(name)
  ).length;

  const falsePositives = detectedNames.filter(name =>
    !correctedNames.includes(name)
  ).length;

  const missed = correctedNames.filter(name =>
    !detectedNames.includes(name)
  ).length;

  return {
    correctDetections,
    falsePositives,
    missed,
    totalDetected: detected.length,
    totalActual: corrected.length,
    precision: detected.length > 0 ? correctDetections / detected.length : 0,
    recall: corrected.length > 0 ? correctDetections / corrected.length : 0,
  };
}

// GET endpoint to retrieve learning insights
export async function GET() {
  try {
    if (!existsSync(LOG_FILE)) {
      return NextResponse.json({
        insights: "No detection data yet",
        totalDetections: 0
      });
    }

    const logData = await readFile(LOG_FILE, "utf-8");
    const logs = logData
      .split("\n")
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    // Analyze logs for insights
    const insights = analyzeLogs(logs);

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Error retrieving insights:", error);
    return NextResponse.json(
      { error: "Failed to retrieve insights" },
      { status: 500 }
    );
  }
}

function analyzeLogs(logs: any[]) {
  const totalDetections = logs.length;

  let totalPrecision = 0;
  let totalRecall = 0;
  let validMetrics = 0;

  const commonMisses: { [key: string]: number } = {};
  const commonFalsePositives: { [key: string]: number } = {};

  logs.forEach(log => {
    if (log.accuracy) {
      totalPrecision += log.accuracy.precision;
      totalRecall += log.accuracy.recall;
      validMetrics++;

      // Track common mistakes
      log.detectedIngredients?.forEach((item: any) => {
        const name = item.name.toLowerCase();
        const wasCorrect = log.userCorrections?.some(
          (c: any) => c.name.toLowerCase() === name
        );
        if (!wasCorrect) {
          commonFalsePositives[name] = (commonFalsePositives[name] || 0) + 1;
        }
      });

      // Track commonly missed items
      log.userCorrections?.forEach((item: any) => {
        const name = item.name.toLowerCase();
        const wasDetected = log.detectedIngredients?.some(
          (d: any) => d.name.toLowerCase() === name
        );
        if (!wasDetected) {
          commonMisses[name] = (commonMisses[name] || 0) + 1;
        }
      });
    }
  });

  const avgPrecision = validMetrics > 0 ? totalPrecision / validMetrics : 0;
  const avgRecall = validMetrics > 0 ? totalRecall / validMetrics : 0;

  return {
    totalDetections,
    averagePrecision: (avgPrecision * 100).toFixed(2) + "%",
    averageRecall: (avgRecall * 100).toFixed(2) + "%",
    f1Score: ((2 * avgPrecision * avgRecall) / (avgPrecision + avgRecall) * 100).toFixed(2) + "%",
    commonMisses: Object.entries(commonMisses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    commonFalsePositives: Object.entries(commonFalsePositives)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    lastUpdated: logs[logs.length - 1]?.timestamp,
  };
}
