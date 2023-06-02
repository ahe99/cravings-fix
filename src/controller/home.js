const path = require('path')

module.exports = {
  indexPage: (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
  },
}
