const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path')
const productRouter = require('./app/product/routes');
const productRouterv2 = require('./app/product_v2/routes');
const logger = require('morgan')
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterv2);
app.use((req, res, next) => {
    res.sendStatus(404);
    res.send({
        status: 'failed',
        message: 'Resourses ' + req.originalUrl + ' Not Found'
    })
})

app.listen(port, ()=> console.log('Server: http://localhost:3000'))