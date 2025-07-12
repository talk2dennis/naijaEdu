import dotenv from 'dotenv';

dotenv.config();

// Function to check if required environment variables are set
const checkEnvVariables = () => {
  const requiredEnvVars = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_EXPIRATION',
    'CORS_ORIGIN',
    'GOOGLE_CLIENT_ID',
    'GEMINI_API_KEY',
    'GEMINI_API_BASE_URL'
  ];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Error: Environment variable ${envVar} is not set.`);
      process.exit(1);
    }
  }
    console.log('All required environment variables are set.');
}

// Call the function to check environment variables
checkEnvVariables();

// export all the environment variables
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const MOVIE_API_KEY = process.env.MOVIE_API_KEY
export const MOVIE_API_URL = process.env.MOVIE_API_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL;