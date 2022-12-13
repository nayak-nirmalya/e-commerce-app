const fs = require('fs')
const path = require('path')

const savePath = path.join(
  path.dirname(__filename),
  '..',
  'data',
  'products.json',
)

const getProductFromFile = (cb) => {
  fs.readFile(savePath, (err, fileContent) => {
    if (err) {
      return cb([])
    }
    cb(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(_id, _title, _imageURL, _price, _description) {
    this.id = _id
    this.title = _title
    this.imageURL = _imageURL
    this.price = _price
    this.description = _description
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id,
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(savePath, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(savePath, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb)
  }

  static findByID(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((singleProduct) => singleProduct.id === id)
      cb(product)
    })
  }
}
