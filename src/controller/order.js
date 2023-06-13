const Parse = require('parse/node')
const Order = Parse.Object.extend('Order')

const Food = Parse.Object.extend('Food')

const SessionQuery = new Parse.Query(Parse.Session)

const {
  parseFromB4AObject,
  toPointer,
  fromPointerToId,
} = require('../helpers/format')

const getFormattedOrder = async (order = {}) => {
  const items = await order.relation('items').query().find()

  const parsedOrder = parseFromB4AObject(order)
  const { objectId, owner, createdAt, updatedAt } = parsedOrder

  const formattedOrderItem = await Promise.all(
    items.map(getOrderItemFromPointer),
  )

  return {
    objectId,
    createdAt,
    updatedAt,
    owner: fromPointerToId(owner),
    items: formattedOrderItem,
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

const getOrderItemFromPointer = async (orderItem) => {
  const {
    food: { objectId: foodId },
    quantity,
  } = parseFromB4AObject(orderItem)

  const FoodQuery = new Parse.Query(Food)
  const foodObject = await FoodQuery.equalTo('objectId', foodId).first()
  const formattedFood = getFormattedFood(foodObject)
  return {
    ...formattedFood,
    quantity,
  }
}

const createOrderItem = async (item) => {
  const { id, quantity } = item
  const newOrderItem = new Parse.Object('OrderItem')

  newOrderItem.set('food', toPointer('Food', id))
  newOrderItem.set('quantity', quantity)
  try {
    const result = await newOrderItem.save()
    return result
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  getAllOrders: async (req, res, next) => {
    const userId = req.query.userId

    const OrderQuery = new Parse.Query(Order)
    if (userId) {
      const userPointer = toPointer('_User', userId)
      OrderQuery.equalTo('owner', userPointer)
    }
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
    const OrderQuery = new Parse.Query(Order)
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

      const OrderQuery = new Parse.Query(Order)
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
    const newOrder = new Parse.Object('Order')

    const { foods } = req.body

    try {
      newOrder.set('owner', toPointer('_User', currentUserId))
      const currentOrderRelation = newOrder.relation('items')

      const items = await Promise.all(foods.map(createOrderItem))
      items.forEach((item) => {
        currentOrderRelation.add(item)
      })

      const result = await newOrder.save()
      // Access the Parse Object attributes using the .GET method
      const formattedOrder = await getFormattedOrder(result)

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

    const OrderQuery = new Parse.Query(Order)
    const currentOrder = await OrderQuery.get(id)
    const currentOrderRelation = currentOrder.relation('items')
    const currentOrderItems = await currentOrderRelation.query().find()
    currentOrderRelation.remove(currentOrderItems)

    try {
      const items = await Promise.all(foods.map(createOrderItem))
      items.forEach((item) => {
        currentOrderRelation.add(item)
      })

      const response = await currentOrder.save()

      const formattedOrder = await getFormattedOrder(response)
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
    const OrderQuery = new Parse.Query(Order)
    const object = await OrderQuery.get(id)
    try {
      const response = await object.destroy()

      const formattedOrder = await getFormattedOrder(response)
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
