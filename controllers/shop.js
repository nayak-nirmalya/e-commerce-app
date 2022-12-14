const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      })
    })
    .catch((err) => console.error(err))
}

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID
  Product.findByPk(prodID)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      })
    })
    .catch((err) => console.error(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      })
    })
    .catch((err) => console.error(err))
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
          })
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}

exports.postCart = (req, res, next) => {
  const { productID } = req.body
  let fetchedCart
  let newQty = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: productID } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQty = product.cartItem.quantity
        newQty = oldQty + 1
        return product
      }
      return Product.findByPk(productID)
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQty },
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch((err) => console.error(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productID } = req.body
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productID } })
    })
    .then((products) => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then((result) => {
      res.redirect('/cart')
    })
    .catch((err) => console.error(err))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity }
              return product
            }),
          )
        })
        .catch((err) => console.error(err))
    })
    .then((result) => {
      return fetchedCart.setProducts(null)
    })
    .then((result) => {
      res.redirect('/orders')
    })
    .catch((err) => console.error(err))
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      })
    })
    .catch((err) => console.error(err))
}
