// No need to import defineConfig; use a plain object for configuration

export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};