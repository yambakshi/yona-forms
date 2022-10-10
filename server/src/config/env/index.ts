import dev from './dev';
import prod from './prod';

const envFile = process.env.NODE_ENV || 'dev';
const envs = { dev, prod };

export const env = envs[envFile];