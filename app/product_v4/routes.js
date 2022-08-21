const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controller')

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.delete('/product/:id', productController.deleteProduct);
router.post('/product', upload.single('image_url'), productController.createProduct);
router.put('/product/:id', upload.single('image_url'), productController.editProduct);


module.exports = router;