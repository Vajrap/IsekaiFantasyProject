import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Determine the current environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

// Server configuration
export const serverConfig = {
  port: parseInt(process.env.PORT || '3030', 10),
  
  // CORS configuration
  cors: {
    // In development, allow all origins or specific test origins
    // In production, restrict to specific origins
    origins: isDevelopment 
      ? [
          'http://localhost:3000',          // React default
          'http://localhost:8080',          // Webpack dev server
          'http://127.0.0.1:5500',          // Live Server (VS Code)
          'http://localhost:5173',          // Vite default
          'http://localhost:3030',          // Same origin
          // Add any other development origins you need
        ]
      : [
          // Production origins - update these with your actual domains
          'https://4cskhjm2-3030.asse.devtunnels.ms/',
          'https://your-production-domain.com'
        ],
    
    // Allow all origins in development mode or if explicitly enabled by env var
    allowAllOrigins: process.env.ALLOW_ALL_ORIGINS === 'true' || isDevelopment,
    
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  },

  // Database configuration
  database: {
    path: process.env.DB_PATH || 'database.sqlite'
  },

  // Logging configuration
  logging: {
    level: isDevelopment ? 'debug' : 'info'
  }
};

// Export other useful environment indicators
export const isProduction = NODE_ENV === 'production';
export const isTest = NODE_ENV === 'test';
export const isDev = isDevelopment;