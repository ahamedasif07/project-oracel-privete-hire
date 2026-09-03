import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), ".data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // Ignore if exists
    }
  }
}

export function readJsonFile<T>(filename: string, defaultValue: T): T {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`⚠️ [Storage] Could not read ${filename}:`, err);
    return defaultValue;
  }
}

export function writeJsonFile<T>(filename: string, data: T): void {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn(`⚠️ [Storage] Could not write ${filename}:`, err);
  }
}
