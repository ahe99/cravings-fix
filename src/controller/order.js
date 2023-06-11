const Parse = require('parse/node')
const Order = Parse.Object.extend('Order')
const OrderQuery = new Parse.Query(Order)

const Food = Parse.Object.extend('Food')
const FoodQuery = new Parse.Query(Food)

const SessionQuery = new Parse.Query(Parse.Session)

const { parseFromB4AObject, toPointer } = require('../helpers/format')

const getFormattedOrder = async (order = {}) => {
  const parsedOrder = parseFromB4AObject(order)

  const { foods } = parsedOrder
  const formattedFoods = await Promise.all(foods.map(getFoodFromPointer))

  return {
    ...parsedOrder,
    foods: formattedFoods,
  }
}

const getFormattedFood = (food = {}) => {
  const parsedFood = parseFromB4AObject(food)
  return {
    ...parsedFood,
    image: {
      src: parsedFood.image?.url ?? '',
    },
    category_id: parsedFood.category_id?.objectId ?? '',
  }
}

const getFoodFromPointer = async (food) => {
  const { objectId } = food
  const foodObject = await FoodQuery.equalTo('objectId', objectId).first()
  return getFormattedFood(foodObject)
}

module.exports = {
  getAllOrders: async (req, res, next) => {
    OrderQuery.find()
      .then((orders) => {
        if (orders) {
          Promise.all(orders.map(getFormattedOrder)).then((formattedOrders) =>
            res.json(formattedOrders),
          )
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  getSingleOrder: (req, res, next) => {
    const id = req.params.id
    OrderQuery.equalTo('objectId', id)
      .first()
      .then((order) => {
        if (order) {
          getFormattedOrder(order).then((formattedOrder) =>
            res.json(formattedOrder),
          )
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  getMyOrders: async (req, res, next) => {
    const { authorization } = req.headers

    const currentSession = await Promise.resolve(
      SessionQuery.equalTo('sessionToken', authorization)
        .include('user')
        .first({ useMasterKey: true }),
    )

    if (currentSession) {
      const currentUserId = currentSession.toJSON().user.objectId

      const userPointer = toPointer('_User', currentUserId)

      OrderQuery.equalTo('owner', userPointer)
        .find()
        .then((orders) => {
          if (orders) {
            Promise.all(orders.map(getFormattedOrder)).then((formattedOrders) =>
              res.json(formattedOrders),
            )
          } else {
            res.json([])
          }
        })
        .catch(function (error) {
          console.log('Error: ' + error.code + ' ' + error.message)
          next(error)
        })
    } else {
      res.status(401).json({ msg: 'not auth' })
    }
  },
  addOrder: async (req, res, next) => {
    const { authorization } = req.headers

    const currentSession = await Promise.resolve(
      SessionQuery.equalTo('sessionToken', authorization)
        .include('user')
        .first({ useMasterKey: true }),
    )

    const currentUserId = currentSession.toJSON().user.objectId

    const userPointer = toPointer('_User', currentUserId)

    const newOrder = new Parse.Object('Order')
    const { foods } = req.body

    const foodPointers = foods.map((foodId) => toPointer('Food', foodId))

    newOrder.set('owner', userPointer)
    newOrder.set('foods', foodPointers)
    try {
      const result = await newOrder.save()
      // Access the Parse Object attributes using the .GET method
      const formattedOrder = getFormattedOrder(result)

      console.log('Order created', formattedOrder)
      res.json(formattedOrder)
    } catch (error) {
      console.error('Error while creating Order: ', error)
      next(error)
    }
  },
  updateOrder: async (req, res, next) => {
    const id = req.params.id
    const { foods } = req.body
    const currentOrder = await OrderQuery.get(id)
    const foodPointers = foods.map((foodId) => toPointer('Food', foodId))

    currentOrder.set('foods', foodPointers)
    try {
      const response = await currentOrder.save()

      const formattedOrder = getFormattedOrder(response)
      console.log('Order updated', formattedOrder)

      res.json({
        msg: 'Order updated',
        objectId: formattedOrder.objectId,
      })
    } catch (error) {
      console.error('Error while updating Order', error)
      next(error)
    }
  },
  deleteOrder: async (req, res, next) => {
    const { id } = req.params
    // here you put the objectId that you want to delete
    const object = await OrderQuery.get(id)
    try {
      const response = await object.destroy()

      const formattedOrder = getFormattedOrder(response)
      console.log('Order Deleted', formattedOrder)

      res.json({
        msg: 'Order Deleted',
        objectId: formattedOrder.objectId,
      })
    } catch (error) {
      console.error('Error while deleting ParseObject', error)
      next(error)
    }
  },
}
