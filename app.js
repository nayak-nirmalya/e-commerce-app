const path = require('path')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errors')
const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findByID('639ad27737a59d363b90a35f')
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.error(err))
  next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
  app.listen(3000)
})
