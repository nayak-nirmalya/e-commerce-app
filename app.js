const path = require('path')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errors')
const sequelize = require('./util/database')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
  .sync()
  .then((res) => {
    // console.log(res)
    app.listen(3000)
  })
  .catch((err) => console.error(err))
