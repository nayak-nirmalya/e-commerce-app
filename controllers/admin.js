const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body
  const product = new Product({
    title: title,
    imageURL: imageURL,
    price: price,
    description: description,
    userId: req.user,
  })
  product
    .save()
    .then((result) => {
      console.log('Product Created!')
      res.redirect('/admin/products')
    })
    .catch((err) => console.error(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodID = req.params.productID
  Product.findById(prodID)
    .then((prod) => {
      if (!prod) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: prod,
      })
    })
    .catch((err) => console.error(err))
}

exports.postEditProduct = (req, res, next) => {
  const { productID, title, price, imageURL, description } = req.body

  Product.findById(productID)
    .then((prod) => {
      prod.title = title
      prod.price = price
      prod.imageURL = imageURL
      prod.description = description
      return prod.save()
    })
    .then((result) => {
      console.log('Updated Product!')
      res.redirect('/admin/products')
    })
    .catch((err) => console.error(err))
}

exports.getProducts = (req, res, next) => {
  Product.find()
    // .populate('userId')
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
    })
    .catch((err) => console.error(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const { productID } = req.body
  Product.findByIdAndRemove(productID)
    .then(() => {
      console.log('Destroyed!')
      res.redirect('/admin/products')
    })
    .catch((err) => console.error(err))
}
