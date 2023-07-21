import { RequestHandler } from 'express'

export const indexPage: RequestHandler = (req, res) => {
  res.send(homePage)
}
const homePage = `
<!DOCTYPE html>
<html>
<head>
  <title>e-commerce-api</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  e-commerce-api is running
</body>
</html>
`
