module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/Courses',

  ACCESS_TOKEN_SECRET: 'TOKEN_SEVRET',
  REFRESH_TOKEN_SECRET: 'REFRESH_SEVRET'
};
