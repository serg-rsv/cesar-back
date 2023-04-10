import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Cesar API',
    version: '1.0.0',
    description: 'API for my cipher application',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '..', 'routes', '*.ts'),
    path.join(__dirname, 'schemas.yaml'),
  ],
  swaggerOptions: {
    schemes: ['http', 'https'],
  },
};

export const swaggerSpec = swaggerJSDoc(options);
