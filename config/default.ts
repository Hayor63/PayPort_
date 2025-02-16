export default {
  port: Number(process.env.PORT) || 9000,
    dbURI:
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URL
        : process.env.NODE_ENV === "test"
        ? process.env.TEST
        : process.env.DB,
    accessTokenPrivateKey: process.env.ACCESSTOKEN,
    refreshTokenPrivateKey: process.env.REFRESHTOKEN,
  };
  