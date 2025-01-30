
import { EnumNodeEnv } from '@constants/enum-node-env.const'; 
import { config } from 'dotenv';

export const env =
  (process.env.NODE_ENV as EnumNodeEnv) || EnumNodeEnv.Development;

config({ path: `.env.${env}` });

export const { PORT = 3001 } = process.env;
