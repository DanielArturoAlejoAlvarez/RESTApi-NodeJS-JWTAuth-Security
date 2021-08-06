import {Router} from 'express'
import { verifyToken } from '../middlewares/Authentication'

const router = Router()

import { getProduct, getProducts, saveProduct, updateProduct, deleteProduct } from '../controllers/product.controllers'

router.get('/', getProducts)
router.get('/:idProduct', getProduct)
router.post('/',verifyToken, saveProduct)
router.put('/:idProduct',verifyToken, updateProduct)
router.delete('/:idProduct', verifyToken, deleteProduct)

export default router