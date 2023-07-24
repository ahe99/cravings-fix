import { RequestHandler } from 'express'

export const indexPage: RequestHandler = (req, res) => {
  res.send(homePage)
}
const homePage = `
<!DOCTYPE html>
<html>
<head>
  <title>cravings-fix-api</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
cravings-fix-api is running
</body>
</html>
`
