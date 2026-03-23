import fs from 'node:fs/promises';
import path from 'node:path';

import dotenv from 'dotenv';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const outputPath = path.join(publicDir, 'app-env.js');

dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local'), override: true });

const requiredKeys = [
  'NG_APP_FIREBASE_API_KEY',
  'NG_APP_FIREBASE_AUTH_DOMAIN',
  'NG_APP_FIREBASE_PROJECT_ID',
  'NG_APP_FIREBASE_STORAGE_BUCKET',
  'NG_APP_FIREBASE_MESSAGING_SENDER_ID',
  'NG_APP_FIREBASE_APP_ID'
];

const optionalKeys = ['NG_APP_FIREBASE_MEASUREMENT_ID'];
const allKeys = [...requiredKeys, ...optionalKeys];

const missingKeys = requiredKeys.filter((key) => !process.env[key]?.trim());

if (missingKeys.length) {
  console.error(`Missing required Firebase environment keys in .env: ${missingKeys.join(', ')}`);
  process.exit(1);
}

const runtimeEnv = Object.fromEntries(allKeys.map((key) => [key, process.env[key]?.trim() ?? '']));

const fileContents = `window.__APP_ENV__ = Object.freeze(${JSON.stringify(runtimeEnv, null, 2)});\n`;

await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(outputPath, fileContents, 'utf8');

console.log(`Generated runtime environment file at ${path.relative(rootDir, outputPath)}.`);
