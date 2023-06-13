const Parse = require('parse/node')
const Cart = Parse.Object.extend('Cart')

const Food = Parse.Object.extend('Food')

const SessionQuery = new Parse.Query(Parse.Session)

const {
  parseFromB4AObject,
  toPointer,
  fromPointerToId,
} = require('../helpers/format')

const getFormattedCart = async (cart = {}) => {
  const items = await cart.relation('items').query().find()

  const parsedCart = parseFromB4AObject(cart)
  const { objectId, owner, createdAt, updatedAt } = parsedCart
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
const createCart = async (userId) => {
  const newCart = new Parse.Object('Cart')
  const currentUser = toPointer('_User', userId)

  newCart.set('owner', currentUser)
  try {
    const result = newCart.save()
    return result
  } catch (error) {
    console.error('Error while creating Cart: ', error)
  }
}

module.exports = {
  getAllCarts: async (req, res, next) => {
    const userId = req.query.userId

    const CartQuery = new Parse.Query(Cart)
    if (userId) {
      const userPointer = toPointer('_User', userId)
      CartQuery.equalTo('owner', userPointer)
    }
    CartQuery.find()
      .then((carts) => {
        if (carts) {
          Promise.all(carts.map(getFormattedCart)).then((formattedCarts) =>
            res.json(formattedCarts),
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
  getSingleCart: (req, res, next) => {
    const id = req.params.id
    const CartQuery = new Parse.Query(Cart)
    CartQuery.equalTo('objectId', id)
      .first()
      .then((order) => {
        if (order) {
          getFormattedCart(order).then((formattedCart) =>
            res.json(formattedCart),
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
  getMyCart: async (req, res, next) => {
    const { authorization } = req.headers

    const currentSession = await Promise.resolve(
      SessionQuery.equalTo('sessionToken', authorization)
        .include('user')
        .first({ useMasterKey: true }),
    )

    if (currentSession) {
      const currentUserId = currentSession.toJSON().user.objectId

      const userPointer = toPointer('_User', currentUserId)

      const CartQuery = new Parse.Query(Cart)
      CartQuery.equalTo('owner', userPointer)
        .first()
        .then((cart) => {
          if (cart) {
            getFormattedCart(cart).then((formattedCart) =>
              res.json(formattedCart),
            )
          } else {
            console.log('Nothing found, please try again')
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
  addCartItem: async (req, res, next) => {
    const { authorization } = req.headers
    const { food } = req.body

    const currentSession = await Promise.resolve(
      SessionQuery.equalTo('sessionToken', authorization)
        .include('user')
        .first({ useMasterKey: true }),
    )
    const currentUserId = currentSession.toJSON().user.objectId
    const userPointer = toPointer('_User', currentUserId)
    const CartQuery = new Parse.Query(Cart)
    let currentCart = await CartQuery.equalTo('owner', userPointer).first()
    if (!currentCart) {
      // create new one
      currentCart = await createCart()
      currentCart.set('owner', userPointer)
    }
    const currentCartRelation = currentCart.relation('items')

    try {
      const item = await createOrderItem(food)
      currentCartRelation.add(item)

      const result = await currentCart.save()
      // Access the Parse Object attributes using the .GET method
      const formattedCart = await getFormattedCart(result)

      res.json(formattedCart)
    } catch (error) {
      console.error('Error while creating Cart: ', error)
      next(error)
    }
  },
  // updateCart: async (req, res, next) => {
  //   const id = req.params.id
  //   const { foods } = req.body

  //   const CartQuery = new Parse.Query(Cart)
  //   const currentCart = await CartQuery.get(id)
  //   const currentCartRelation = currentCart.relation('items')
  //   const currentOrderItems = await currentCartRelation.query().find()
  //   currentCartRelation.remove(currentOrderItems)

  //   try {
  //     const items = await Promise.all(foods.map(createOrderItem))
  //     items.forEach((item) => {
  //       currentCartRelation.add(item)
  //     })

  //     const response = await currentCart.save()

  //     const formattedCart = await getFormattedCart(response)
  //     console.log('Cart updated', formattedCart)

  //     res.json({
  //       msg: 'Cart updated',
  //       objectId: formattedCart.objectId,
  //     })
  //   } catch (error) {
  //     console.error('Error while updating Cart', error)
  //     next(error)
  //   }
  // },
  // deleteCart: async (req, res, next) => {
  //   const { id } = req.params
  //   // here you put the objectId that you want to delete
  //   const CartQuery = new Parse.Query(Cart)
  //   const object = await CartQuery.get(id)
  //   try {
  //     const response = await object.destroy()

  //     const formattedCart = await getFormattedCart(response)
  //     console.log('Cart Deleted', formattedCart)

  //     res.json({
  //       msg: 'Cart Deleted',
  //       objectId: formattedCart.objectId,
  //     })
  //   } catch (error) {
  //     console.error('Error while deleting ParseObject', error)
  //     next(error)
  //   }
  // },
}
