import { Application } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
import swaggerJSDoc, { OAS3Definition } from 'swagger-jsdoc'

export const definition: OAS3Definition = {
  // https://swagger.io/specification/#appendix-a-revision-history
  openapi: '3.0.3',
  info: {
    title: 'Cravings Fix API',
    version: '1.0.0',
    description: 'Docs to use Cravings Fix API',
  },
  components: {
      securitySchemes: {
          token: {
              description: 'JWT authorization of an API',
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
          },
      },
  },
}

const init = (app: Application) => {
  const options: swaggerJSDoc.OAS3Options = {
    definition,
    apis: ['**/server.{js,ts}', '**/routes/**/*.{js,ts}'],
  }

  const swaggerSpec = swaggerJSDoc(options)

  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(swaggerSpec, null, 4))
  })
  const swaggerUiOptions: SwaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      url: '/swagger.json',
    },
  }
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, swaggerUiOptions),
  )
}

export default init
