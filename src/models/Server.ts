
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
export type ServerUrl = {
  host?: string;
  port?: string | number;
}

export type ApiPaths = {
  expansions: string;
}