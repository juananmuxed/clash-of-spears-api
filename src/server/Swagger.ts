import swaggerJsDoc from 'swagger-jsdoc';

export const useSwaggerOptions = () => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.3',
      info: {
        version: '1.0.0',
        title: 'Clash of Spears API',
        termsOfService: 'http://swagger.io/terms/',
        description: 'API Clash of spears public',
        contact: {
          name: 'MuXeD',
          url: 'https://github.com/juananmuxed',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/controllers/*.ts', './src/db/models/*.ts', './src/models/*.ts'],
  };
  return swaggerOptions;
};

export const useSwagger = () => {
  const swaggerDocs = swaggerJsDoc(useSwaggerOptions());
  return swaggerDocs;
};
