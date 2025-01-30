import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

const NODE_ENV = 'development';
const envFilePath = path.resolve(__dirname, `.env.${NODE_ENV}`);

try {
  if (!fs.existsSync(envFilePath)) {
    throw new Error(`Env file not found at path: ${envFilePath}`);
  }

  dotenv.config({ path: envFilePath });

  execSync('yarn db:start', { stdio: 'inherit' });
  execSync('npx prisma migrate dev', { stdio: 'inherit' });

  const prisma = new PrismaClient();
  const sqlDirectory = path.resolve(__dirname, 'data', 'sql');
  const sqlFiles = fs
    .readdirSync(sqlDirectory)
    .filter((file) => file.endsWith('.sql'));

  async function runSql() {
    try {
      for (const file of sqlFiles) {
        const filePath = path.join(sqlDirectory, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        await prisma.$executeRawUnsafe(sql);
        console.log(`Executed SQL script: ${file}`);
      }
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  runSql()
    .then(() => {
      console.log('Setup completed successfully.');
    })
    .catch((error) => {
      console.error('Error executing SQL scripts:', error);
      process.exit(1);
    });
} catch (error) {
  console.error(error);
  process.exit(1);
}

export {};
