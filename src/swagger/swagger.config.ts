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
    {
      url: 'https://cesar-ws.onrender.com/api',
      description: 'Live server',
    },
  ],
  components: {
    schemas: {
      AuthRequestBody: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
          },
        },
        required: ['email', 'password'],
      },
      SuccessAuth: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            description: 'Access token for authorized requests',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
      MessageToSave: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The message to be encrypted.',
            example: 'Hello world!',
          },
          key: {
            type: ['number', 'string'],
            description:
              'The encryption key to be used (can be a number or string).',
            example: 'mysecretkey',
          },
          type: {
            type: 'string',
            description: 'The encryption type to be used.',
            enum: ['cesar', 'xor'],
            example: 'xor',
          },
        },
        required: ['text', 'key', 'type'],
      },
      Message: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            description: 'The message DB id',
            example: 9,
          },
          text: {
            type: 'string',
            description: 'The saved encrypted message',
            example: 'Ury%$yb@jbeyq',
          },
        },
      },
      DecryptedMessage: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            description: 'ID of the decrypted message',
            example: 13,
          },
          text: {
            type: 'string',
            description: 'Decrypted message',
            example: 'Hello world!',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'Current user email',
          },
        },
      },
    },
    responses: {
      BadRequestError: {
        description: 'Bad request. Missing or invalid some required data.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Email and password are required.',
                },
              },
            },
          },
        },
      },
      UnauthorizedError: {
        description: 'Unauthorized. Missing or invalid authorization header.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Invalid credentials.',
                },
              },
            },
          },
        },
      },
      NotFoundError: {
        description: 'The requested resource was not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'The error message',
                  example: 'Message not found',
                },
              },
            },
          },
        },
      },
      ForbiddenError: {
        description: 'Access to the requested resource is denied',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'The error message',
                  example: 'Access denied',
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '..', 'routes', '*.*s')],
  swaggerOptions: {
    schemes: ['http', 'https'],
  },
};

export const swaggerSpec = swaggerJSDoc(options);
