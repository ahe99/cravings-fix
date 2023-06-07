module.exports = {
  parseFromB4AObject: (obj = {}) => {
    return JSON.parse(JSON.stringify(obj))
  },
}
