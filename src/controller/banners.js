const Parse = require('parse/node')
const Banner = Parse.Object.extend('Banner')
const BannerQuery = new Parse.Query(Banner)

const { parseFromB4AObject } = require('../helpers/format')

const getFormattedBanner = (food = {}) => {
  const parsedBanner = parseFromB4AObject(food)
  console.log('parsedBanner', parsedBanner)
  return {
    ...parsedBanner,
    image: {
      url: parsedBanner.image?.url ?? '',
    },
  }
}

module.exports = {
  getAllBanners: async (req, res, next) => {
    BannerQuery.find()
      .then((banners) => {
        if (banners) {
          const formattedBanners = banners.map(getFormattedBanner)

          res.json(formattedBanners)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  getSingleBanner: async (req, res, next) => {
    const id = req.params.id
    BannerQuery.equalTo('objectId', id)
      .first()
      .then((food) => {
        if (food) {
          const formattedBanner = getFormattedBanner(food)

          res.json(formattedBanner)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  addBanner: async (req, res, next) => {
    if (typeof req.body === 'undefined') {
      res.json({
        status: 'error',
        message: 'data is undefined',
      })
    } else {
      const newBanner = new Parse.Object('Banner')
      const { name, description } = req.body
      const fileData = req.file

      const parseFile = new Parse.File(fileData.originalname, {
        base64: fileData.buffer.toString('base64'),
      })

      newBanner.set('name', name)
      newBanner.set('description', description)
      newBanner.set('image', parseFile)
      try {
        const result = await newBanner.save()
        // Access the Parse Object attributes using the .GET method
        const formattedBanner = getFormattedBanner(result)

        console.log('Banner created', formattedBanner)
        res.json(formattedBanner)
      } catch (error) {
        console.error('Error while creating Banner: ', error)
        next(error)
      }
    }
  },
  updateBanner: async (req, res, next) => {
    const id = req.params.id

    const currentBanner = await BannerQuery.get(id)

    const { name, description } = req.body
    const fileData = req.file

    const parseFile = new Parse.File(fileData.originalname, {
      base64: fileData.buffer.toString('base64'),
    })

    currentBanner.set('name', name)
    currentBanner.set('description', description)
    currentBanner.set('image', parseFile)
    try {
      const result = await currentBanner.save()
      // Access the Parse Object attributes using the .GET method
      const formattedBanner = getFormattedBanner(result)
      console.log('Banner updated', formattedBanner)

      res.json({
        msg: 'Banner updated',
        objectId: formattedBanner.objectId,
        image: {
          url: formattedBanner.image.url,
        },
      })
      console.log('Banner updated', result)
      res.json(result)
    } catch (error) {
      console.error('Error while creating Image: ', error)
      next(error)
    }
  },
  deleteBanner: async (req, res, next) => {
    const { id } = req.params
    try {
      // here you put the objectId that you want to delete
      const object = await BannerQuery.get(id)
      try {
        const response = await object.destroy()

        const formattedBanner = getFormattedBanner(response)
        console.log('Banner Deleted', formattedBanner)

        res.json({
          msg: 'Banner Deleted',
          objectId: formattedBanner.objectId,
        })
      } catch (error) {
        console.error('Error while deleting ParseObject', error)
        next(error)
      }
    } catch (error) {
      console.error('Error while retrieving ParseObject', error)
      next(error)
    }
  },
}
