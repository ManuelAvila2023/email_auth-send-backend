import dotenv from 'dotenv';

// Cargar .env SOLO en local
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const ENV = process.env.ENV || process.env.NODE_ENV || 'development';

export const env = {
  ENV,
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  GOOGLE_APP_EMAIL: process.env.GOOGLE_APP_EMAIL || '',
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD || '',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};

// // src/config/env.js
// // Cargar .env SOLO en local
// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = await import('dotenv');
//   dotenv.config();
// }

// const ENV = process.env.ENV || process.env.NODE_ENV || 'development';

// export const env = {
//   ENV,
//   PORT: process.env.PORT || 3000,
//   DATABASE_URL: process.env.DATABASE_URL || '',
//   GOOGLE_APP_EMAIL: process.env.GOOGLE_APP_EMAIL || '',
//   GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD || '',
//   JWT_SECRET: process.env.JWT_SECRET,
//   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
// };

// // process.loadEnvFile();

// // const ENV = process.env.ENV || process.env.NODE_ENV || 'development';

// // export const env = {
// //   ENV,
// //   PORT: process.env.PORT || 3000,
// //   DATABASE_URL: process.env.DATABASE_URL || '',
// //   GOOGLE_APP_EMAIL: process.env.GOOGLE_APP_EMAIL || '',
// //   GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD || '',
// //   JWT_SECRET: process.env.JWT_SECRET,
// //   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
// // };