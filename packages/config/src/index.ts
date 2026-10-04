export const appConfig = {
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  apiPort: Number(process.env.API_PORT ?? 3001),
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
