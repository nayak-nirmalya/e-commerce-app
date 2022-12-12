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
  constructor(_title, _imageURL, _price, _description) {
    this.title = _title
    this.imageURL = _imageURL
    this.price = _price
    this.description = _description
  }

  save() {
    getProductFromFile((products) => {
      products.push(this)
      fs.writeFile(savePath, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb)
  }
}
