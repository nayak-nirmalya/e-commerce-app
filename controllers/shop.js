const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.findByID(prodID)
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
  Product.find()
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
    .then((products) => {
      res
        .render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}

exports.postCart = (req, res, next) => {
  const { productID } = req.body
  Product.findByID(productID)
    .then((product) => {
      return req.user.addToCart(product)
    })
    .then((result) => {
      console.log(result)
      res.redirect('/cart')
    })
    .catch((err) => {
      console.error(err)
    })
  // let fetchedCart
  // let newQty = 1
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart
  //     return cart.getProducts({ where: { id: productID } })
  //   })
  //   .then((products) => {
  //     let product
  //     if (products.length > 0) {
  //       product = products[0]
  //     }

  //     if (product) {
  //       const oldQty = product.cartItem.quantity
  //       newQty = oldQty + 1
  //       return product
  //     }
  //     return Product.findByPk(productID)
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQty },
  //     })
  //   })
  //   .then(() => {
  //     res.redirect('/cart')
  //   })
  //   .catch((err) => console.error(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productID } = req.body
  req.user
    .deleteItemFromCart(productID)
    .then((result) => {
      res.redirect('/cart')
    })
    .catch((err) => console.error(err))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .addOrder()
    .then((result) => {
      res.redirect('/orders')
    })
    .catch((err) => console.error(err))
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      })
    })
    .catch((err) => console.error(err))
}
