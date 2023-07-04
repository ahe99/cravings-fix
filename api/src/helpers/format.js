module.exports = {
  parseFromB4AObject: (obj = {}) => {
    return JSON.parse(JSON.stringify(obj))
  },
  toPointer: (className, objectId) => {
    return {
      __type: 'Pointer',
      className,
      objectId,
    }
  },
  fromPointerToId: (pointer) => {
    const { objectId } = pointer
    return objectId
  },
}
