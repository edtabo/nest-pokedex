export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDbUrl: process.env.MONGODB || '',
  port: process.env.PORT || 3002,
  limit: Number(process.env.DEFAULT_LIMIT) || 2
});