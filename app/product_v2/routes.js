const router = require('express').Router();
const multer = require('multer')
const upload = multer({dest: '../../uploads'})
const ProductContoller = require('./controller')


router.get('/product', ProductContoller.getProduct)
router.get('/product/:id', ProductContoller.getProductByID)
router.post('/product', upload.single('image_url'), ProductContoller.createProduct)
router.delete('/product/:id', upload.single('image_url'), ProductContoller.deleteProduct)
router.put('/product/:id', upload.single('image_url'), ProductContoller.updateProduct)

module.exports = router;