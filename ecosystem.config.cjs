module.exports = {
  apps: [
    {
      name: "server",
      script: `./src/server.js`,
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PORT,
        BUCKET_NAME: process.env.BUCKET_NAME,
      },
    },
  ],
};
